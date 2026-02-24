#!/usr/bin/env python3
"""
notion_to_blog.py
-----------------
Lee posts con Status=Ready del Content Calendar de Notion,
los convierte en blogs GEO completos con Claude, los publica
en Firebase y marca el post como Published en Notion.

Uso:
  cd growth4u-landing
  pip install requests anthropic python-dotenv
  python scripts/notion_to_blog.py
"""

import os
import json
import time
import re
import unicodedata
import urllib.request
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv

try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# ── Config ──────────────────────────────────────────────────────────────
NOTION_TOKEN   = os.getenv('NOTION_TOKEN')
ANTHROPIC_KEY  = os.getenv('ANTHROPIC_API_KEY')

# ID de la base de datos del Content Calendar (DB principal)
NOTION_DB_ID = os.getenv('NOTION_DB_1', '2fd5dacf4f1481d6848ed27ede8f3316')

FIREBASE_PROJECT_ID = 'landing-growth4u'
FIREBASE_APP_ID     = 'growth4u-public-app'
FIRESTORE_BASE      = f'https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents'
COLLECTION_PATH     = f'artifacts/{FIREBASE_APP_ID}/public/data/blog_posts'

NETLIFY_HOOK = 'https://api.netlify.com/build_hooks/69738cc3fc679a8f858929cd'

NOTION_HEADERS = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
}

TYPE_TO_CATEGORY = {
    '💡 Aha':        'Estrategia',
    '⚔️ Conflicto':  'Marketing',
    '⚙️ Sistema':    'Growth',
    '🔥 Opinión':    'Estrategia',
    '🏆 Victoria':   'Growth',
}


# ── Helpers Notion ───────────────────────────────────────────────────────

def get_prop_text(props, key):
    prop = props.get(key, {})
    ptype = prop.get('type', '')
    items = prop.get(ptype, []) if ptype in ('title', 'rich_text') else []
    return ''.join(t.get('plain_text', '') for t in items)


def get_prop_select(props, key):
    prop = props.get(key, {})
    ptype = prop.get('type', '')
    val = prop.get(ptype, {})
    return val.get('name', '') if val else ''


def fetch_ready_pages():
    url = f'https://api.notion.com/v1/databases/{NOTION_DB_ID}/query'
    body = {'filter': {'property': 'Status', 'status': {'equals': 'Ready'}}}
    r = requests.post(url, headers=NOTION_HEADERS, json=body)
    r.raise_for_status()
    return r.json().get('results', [])


def fetch_page_content(page_id):
    url = f'https://api.notion.com/v1/blocks/{page_id}/children?page_size=100'
    r = requests.get(url, headers=NOTION_HEADERS)
    r.raise_for_status()
    blocks = r.json().get('results', [])

    lines = []
    for block in blocks:
        btype = block.get('type', '')
        content = block.get(btype, {})
        rich = content.get('rich_text', [])
        text = ''.join(t.get('plain_text', '') for t in rich)

        if btype == 'heading_1':
            lines.append(f'\n# {text}')
        elif btype == 'heading_2':
            lines.append(f'\n## {text}')
        elif btype == 'heading_3':
            lines.append(f'\n### {text}')
        elif btype in ('bulleted_list_item', 'numbered_list_item'):
            lines.append(f'- {text}')
        elif btype == 'paragraph' and text:
            lines.append(text)
        elif btype == 'divider':
            lines.append('\n---\n')

    return '\n'.join(lines).strip()


def mark_published(page_id):
    url = f'https://api.notion.com/v1/pages/{page_id}'
    r = requests.patch(url, headers=NOTION_HEADERS,
                       json={'properties': {'Status': {'status': {'name': 'Published'}}}})
    r.raise_for_status()
    print('  ✓ Notion → Published')


# ── GEO Generation con Claude ────────────────────────────────────────────

GEO_SYSTEM_PROMPT = """Eres un experto en Growth Marketing para empresas tech B2B y B2C.
Convierte el borrador de LinkedIn en un artículo de blog completo en formato GEO (Generative Engine Optimization), optimizado para ser citado por LLMs.

El artículo debe estar en ESPAÑOL, tener entre 800-1200 palabras y seguir EXACTAMENTE esta estructura Markdown:

## Respuesta directa
[2-3 frases que responden directamente la pregunta principal]

## [Sección 1]
[Contenido con contexto]

## [Sección 2]
### Punto 1
### Punto 2
### Punto 3

| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|

## Preguntas frecuentes
**¿Pregunta 1?**
Respuesta concisa.

**¿Pregunta 2?**
Respuesta concisa.

**¿Pregunta 3?**
Respuesta concisa.

Devuelve SOLO el Markdown del artículo, sin explicaciones."""


def generate_geo_content(title, draft_content, category):
    if not HAS_ANTHROPIC or not ANTHROPIC_KEY or ANTHROPIC_KEY == 'tu_clave_aqui':
        print('  ⚠️  Sin ANTHROPIC_API_KEY — publicando contenido original')
        return draft_content

    client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
    print('  🤖 Generando GEO con Claude...')
    msg = client.messages.create(
        model='claude-sonnet-4-6',
        max_tokens=4096,
        system=GEO_SYSTEM_PROMPT,
        messages=[{'role': 'user', 'content': f'Título: {title}\nCategoría: {category}\n\nBorrador:\n{draft_content}'}],
    )
    return msg.content[0].text


# ── Firebase ─────────────────────────────────────────────────────────────

def create_slug(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'[^\w-]+', '', text)
    return re.sub(r'--+', '-', text)


def post_exists_in_firebase(title):
    """Comprueba si ya existe un post con el mismo título en Firebase."""
    url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
    for doc in data.get('documents', []):
        existing_title = doc.get('fields', {}).get('title', {}).get('stringValue', '')
        if existing_title.lower().strip() == title.lower().strip():
            return True
    return False


def publish_to_firebase(title, category, excerpt, content):
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    post_data = {
        'fields': {
            'title':     {'stringValue': title},
            'category':  {'stringValue': category},
            'excerpt':   {'stringValue': excerpt},
            'content':   {'stringValue': content},
            'image':     {'stringValue': ''},
            'readTime':  {'stringValue': '6 min lectura'},
            'author':    {'stringValue': 'Equipo Growth4U'},
            'createdAt': {'timestampValue': now},
            'updatedAt': {'timestampValue': now},
        }
    }
    url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}'
    data = json.dumps(post_data).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
    return result['name'].split('/')[-1]


def trigger_deploy():
    req = urllib.request.Request(NETLIFY_HOOK, data=b'', method='POST')
    with urllib.request.urlopen(req):
        pass
    print('  🚀 Deploy en Netlify disparado')


# ── Main ─────────────────────────────────────────────────────────────────

def main():
    print('=' * 60)
    print('Growth4U — Notion → Blog Publisher')
    print('=' * 60)

    if not NOTION_TOKEN:
        print('❌ NOTION_TOKEN no configurado en .env')
        return

    ready_pages = fetch_ready_pages()
    print(f'\n📋 Posts con Status=Ready: {len(ready_pages)}\n')

    if not ready_pages:
        print('No hay posts Ready. Nada que publicar.')
        return

    published_count = 0

    for page in ready_pages:
        props   = page['properties']
        page_id = page['id']
        title   = get_prop_text(props, 'Title')
        ltype   = get_prop_select(props, 'Type')
        category = TYPE_TO_CATEGORY.get(ltype, 'Estrategia')

        print(f'📝 {title[:55]}')
        print(f'   Tipo: {ltype} → Categoría: {category}')

        # Evitar duplicados en Firebase
        if post_exists_in_firebase(title):
            print('  ⏭️  Ya existe en Firebase. Marcando Published en Notion...')
            try:
                mark_published(page_id)
            except Exception as e:
                print(f'  ⚠️  Error Notion: {e}')
            print()
            continue

        draft_content = fetch_page_content(page_id)
        if not draft_content:
            print('  ⚠️  Sin contenido. Saltando.\n')
            continue

        geo_content = generate_geo_content(title, draft_content, category)

        lines = [l for l in geo_content.split('\n') if l.strip() and not l.startswith('#')]
        excerpt = lines[0][:200] if lines else title

        try:
            doc_id = publish_to_firebase(title, category, excerpt, geo_content)
            print(f'  ✅ Firebase ID: {doc_id}')
            print(f'  🔗 /blog/{create_slug(title)}/')
        except Exception as e:
            print(f'  ❌ Error Firebase: {e}\n')
            continue

        try:
            mark_published(page_id)
        except Exception as e:
            print(f'  ⚠️  Error Notion: {e}')

        published_count += 1
        print()
        time.sleep(1)

    if published_count > 0:
        trigger_deploy()
        print(f'\n✅ {published_count} post(s) publicado(s).')
    else:
        print('\nNingún post nuevo publicado.')


if __name__ == '__main__':
    main()
