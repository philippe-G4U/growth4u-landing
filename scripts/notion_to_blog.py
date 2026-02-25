#!/usr/bin/env python3
"""
notion_to_blog.py
-----------------
Lee posts con Status=Ready del Content Calendar de Notion,
los convierte en blogs GEO completos con Claude, los publica
en Firebase y marca el post como Published en Notion.

Uso:
  cd growth4u-landing
  pip install requests anthropic python-dotenv Pillow
  python scripts/notion_to_blog.py
"""

import io
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

try:
    from PIL import Image, ImageDraw, ImageFont
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# ── Config ──────────────────────────────────────────────────────────────
NOTION_TOKEN   = os.getenv('NOTION_TOKEN')
ANTHROPIC_KEY  = os.getenv('ANTHROPIC_API_KEY')

# ID de la base de datos del Content Calendar (DB principal)
NOTION_DB_ID = os.getenv('NOTION_DB_ID', '2c75dacf4f1481da8426d2e4411aa286')

FIREBASE_PROJECT_ID = 'landing-growth4u'
FIREBASE_APP_ID     = 'growth4u-public-app'
FIRESTORE_BASE      = f'https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents'
COLLECTION_PATH     = f'artifacts/{FIREBASE_APP_ID}/public/data/blog_posts'

NETLIFY_HOOK = 'https://api.netlify.com/build_hooks/69738cc3fc679a8f858929cd'

CLOUDINARY_CLOUD_NAME    = 'dsc0jsbkz'
CLOUDINARY_UPLOAD_PRESET = 'blog_uploads'

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
    """
    La base del Blog Content Calendar es multi-source y no se puede consultar
    directamente. Buscamos las 100 páginas más recientes del workspace y
    filtramos por database_id + Status=Ready (tipo select).
    Los posts Ready aparecen siempre en las primeras páginas porque se
    ordenan por última edición.
    """
    target_db = NOTION_DB_ID.replace('-', '')
    r = requests.post('https://api.notion.com/v1/search',
                      headers=NOTION_HEADERS,
                      json={
                          'filter': {'value': 'page', 'property': 'object'},
                          'page_size': 100,
                          'sort': {'direction': 'descending', 'timestamp': 'last_edited_time'},
                      })
    r.raise_for_status()
    pages = r.json().get('results', [])

    ready = []
    for page in pages:
        parent = page.get('parent', {})
        page_db = (parent.get('database_id') or '').replace('-', '')
        if page_db != target_db:
            continue
        props = page.get('properties', {})
        status_val = props.get('Status', {}).get('select', {})
        if status_val and status_val.get('name') == 'Ready':
            ready.append(page)
    return ready


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
                       json={'properties': {'Status': {'select': {'name': 'Published'}}}})
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
    for attempt in range(5):
        try:
            msg = client.messages.create(
                model='claude-sonnet-4-6',
                max_tokens=4096,
                system=GEO_SYSTEM_PROMPT,
                messages=[{'role': 'user', 'content': f'Título: {title}\nCategoría: {category}\n\nBorrador:\n{draft_content}'}],
            )
            return msg.content[0].text
        except Exception as e:
            if '529' in str(e) or 'overloaded' in str(e).lower():
                wait = 30 * (attempt + 1)
                print(f'  ⏳ API sobrecargada, esperando {wait}s...')
                time.sleep(wait)
            else:
                raise
    raise Exception('API de Anthropic sigue sobrecargada tras 5 intentos')


# ── Cover Image ──────────────────────────────────────────────────────────

def _wrap_text(draw, text, font, max_width):
    """Divide el texto en líneas que caben en max_width."""
    words = text.split()
    lines, current = [], []
    for word in words:
        test = ' '.join(current + [word])
        w = draw.textlength(test, font=font)
        if w <= max_width:
            current.append(word)
        else:
            if current:
                lines.append(' '.join(current))
            current = [word]
    if current:
        lines.append(' '.join(current))
    return lines


def generate_cover_bytes(title):
    """
    Genera una imagen de portada 1200×630 igual al generador del admin:
    gradiente navy→azul→teal, overlay oscuro, título centrado en blanco.
    """
    if not HAS_PILLOW:
        return None

    W, H = 1200, 630

    # Gradiente horizontal: #032149 → #1a3690 (55%) → #0faec1 (100%)
    img = Image.new('RGB', (W, H))
    pixels = img.load()
    c0 = (3,  33,  73)   # #032149
    c1 = (26, 54,  144)  # #1a3690
    c2 = (15, 174, 193)  # #0faec1
    for x in range(W):
        t = x / W
        if t <= 0.55:
            s = t / 0.55
            r = int(c0[0] + (c1[0] - c0[0]) * s)
            g = int(c0[1] + (c1[1] - c0[1]) * s)
            b = int(c0[2] + (c1[2] - c0[2]) * s)
        else:
            s = (t - 0.55) / 0.45
            r = int(c1[0] + (c2[0] - c1[0]) * s)
            g = int(c1[1] + (c2[1] - c1[1]) * s)
            b = int(c1[2] + (c2[2] - c1[2]) * s)
        for y in range(H):
            pixels[x, y] = (r, g, b)

    # Overlay oscuro de arriba hacia abajo (0.25 → 0.05 opacidad)
    for y in range(H):
        t = y / H
        alpha = 0.25 - 0.20 * t
        for x in range(W):
            pr, pg, pb = pixels[x, y]
            pixels[x, y] = (
                int(pr * (1 - alpha)),
                int(pg * (1 - alpha)),
                int(pb * (1 - alpha)),
            )

    # Texto
    draw = ImageDraw.Draw(img)
    font_size = 64 if len(title) > 60 else 72 if len(title) > 45 else 80
    font = None
    for path in [
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf',
    ]:
        try:
            font = ImageFont.truetype(path, font_size)
            break
        except Exception:
            pass
    if font is None:
        font = ImageFont.load_default()

    lines = _wrap_text(draw, title, font, 1060)
    line_h = font_size * 1.25
    total_h = len(lines) * line_h
    y = (H - total_h) / 2

    for line in lines:
        w = draw.textlength(line, font=font)
        draw.text(((W - w) / 2, y), line, fill='white', font=font)
        y += line_h

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return buf.read()


def upload_cover_to_cloudinary(title):
    """Genera la imagen de portada y la sube a Cloudinary. Devuelve la URL."""
    image_bytes = generate_cover_bytes(title)
    if not image_bytes:
        print('  ⚠️  Pillow no disponible — sin imagen de portada')
        return ''

    filename = f'cover-{int(time.time())}.png'
    url = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/image/upload'
    r = requests.post(url,
                      files={'file': (filename, image_bytes, 'image/png')},
                      data={'upload_preset': CLOUDINARY_UPLOAD_PRESET})
    r.raise_for_status()
    image_url = r.json().get('secure_url', '')
    print(f'  🖼️  Portada: {image_url}')
    return image_url


# ── Firebase ─────────────────────────────────────────────────────────────

POSTS_CACHE_FILE = os.path.join(os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json')

def create_slug(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'[^\w-]+', '', text)
    return re.sub(r'--+', '-', text)


def load_posts_cache():
    """Carga el JSON cache local de posts."""
    if os.path.exists(POSTS_CACHE_FILE):
        with open(POSTS_CACHE_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
    return []


def save_post_to_cache(title, category, excerpt, content, image_url, doc_id):
    """Añade un post al JSON cache local."""
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    posts = load_posts_cache()
    slug = create_slug(title)
    # Evitar duplicados en el cache
    posts = [p for p in posts if p.get('slug') != slug]
    posts.insert(0, {
        'id': doc_id or slug,
        'title': title,
        'slug': slug,
        'category': category,
        'excerpt': excerpt,
        'content': content,
        'image': image_url,
        'readTime': '6 min lectura',
        'author': 'Equipo Growth4U',
        'createdAt': now,
        'updatedAt': now,
    })
    with open(POSTS_CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)


def post_exists_in_cache(title):
    """Comprueba si ya existe un post con el mismo slug en el JSON cache."""
    slug = create_slug(title)
    posts = load_posts_cache()
    return any(p.get('slug') == slug for p in posts)


def post_exists_in_firebase(title):
    """Comprueba si ya existe un post con el mismo título en Firebase.
    Primero comprueba el cache local para evitar lecturas a Firebase."""
    # Comprobar cache local primero (sin cuota)
    if post_exists_in_cache(title):
        return True
    # Fallback: comprobar Firebase (puede fallar con 429)
    try:
        url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}'
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
        for doc in data.get('documents', []):
            existing_title = doc.get('fields', {}).get('title', {}).get('stringValue', '')
            if existing_title.lower().strip() == title.lower().strip():
                return True
        return False
    except Exception:
        # Si Firebase falla (429, etc.), confiar solo en el cache local
        return False


def publish_to_firebase(title, category, excerpt, content, image_url=''):
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    post_data = {
        'fields': {
            'title':     {'stringValue': title},
            'category':  {'stringValue': category},
            'excerpt':   {'stringValue': excerpt},
            'content':   {'stringValue': content},
            'image':     {'stringValue': image_url},
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


def trigger_deploy(count):
    """
    Dispara un rebuild de producción en Netlify actualizando un archivo
    real en astro-app/ para que Netlify no cancele el build por smart-builds.
    """
    import subprocess
    from datetime import datetime, timezone
    repo_root = os.path.join(os.path.dirname(__file__), '..')
    trigger_file = os.path.join(repo_root, 'astro-app', 'public', 'build-trigger.txt')

    # Escribe timestamp en el archivo para que Netlify detecte un cambio real
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    with open(trigger_file, 'w') as f:
        f.write(f'{now}\n')

    msg = f'chore: publish {count} new blog post(s) from Notion [{now}]'
    try:
        subprocess.run(['git', 'add',
                        'astro-app/public/build-trigger.txt',
                        'astro-app/src/data/posts.json'],
                       cwd=repo_root, check=True, capture_output=True)
        subprocess.run(['git', 'commit', '-m', msg],
                       cwd=repo_root, check=True, capture_output=True)
        subprocess.run(['git', 'push', 'origin', 'main'],
                       cwd=repo_root, check=True, capture_output=True)
        print('  🚀 Deploy de producción disparado (git push → main)')
    except subprocess.CalledProcessError as e:
        print(f'  ⚠️  Git push falló: {e.stderr.decode().strip()}')


# ── Main ─────────────────────────────────────────────────────────────────

def main():
    print('=' * 60)
    print('Growth4U — Notion → Blog Publisher')
    print('=' * 60)

    if not NOTION_TOKEN:
        print('❌ NOTION_TOKEN no configurado en .env')
        return

    if not HAS_PILLOW:
        print('⚠️  Pillow no instalado — sin imágenes de portada')
        print('   Instala con: pip install Pillow\n')

    ready_pages = fetch_ready_pages()
    print(f'\n📋 Posts con Status=Ready: {len(ready_pages)}\n')

    if not ready_pages:
        print('No hay posts Ready. Nada que publicar.')
        return

    published_count = 0

    for page in ready_pages:
        props   = page['properties']
        page_id = page['id']
        title    = get_prop_text(props, 'Title')
        ltype    = get_prop_select(props, 'Blog Type')
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

        # Generar y subir imagen de portada
        try:
            image_url = upload_cover_to_cloudinary(title)
        except Exception as e:
            print(f'  ⚠️  Error generando portada: {e}')
            image_url = ''

        try:
            doc_id = publish_to_firebase(title, category, excerpt, geo_content, image_url)
            print(f'  ✅ Firebase ID: {doc_id}')
            print(f'  🔗 /blog/{create_slug(title)}/')
        except Exception as e:
            print(f'  ❌ Error Firebase: {e}\n')
            continue

        # Guardar en cache JSON local (para que el build no necesite Firebase)
        save_post_to_cache(title, category, excerpt, geo_content, image_url, doc_id)

        try:
            mark_published(page_id)
        except Exception as e:
            print(f'  ⚠️  Error Notion: {e}')

        published_count += 1
        print()
        time.sleep(1)

    if published_count > 0:
        trigger_deploy(published_count)
        print(f'\n✅ {published_count} post(s) publicado(s).')
    else:
        print('\nNingún post nuevo publicado.')


if __name__ == '__main__':
    main()
