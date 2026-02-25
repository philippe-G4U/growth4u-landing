#!/usr/bin/env python3
"""
rebuild_posts_cache.py
----------------------
Regenera astro-app/src/data/posts.json desde Notion + Claude.
Útil cuando Firebase está caído o rate-limited.

Lee todos los posts con Status=Published (o Ready) de Notion,
regenera el contenido GEO con Claude y guarda el JSON sin tocar Firebase.

Uso:
  python scripts/rebuild_posts_cache.py
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

NOTION_TOKEN  = os.getenv('NOTION_TOKEN')
ANTHROPIC_KEY = os.getenv('ANTHROPIC_API_KEY')
NOTION_DB_ID  = os.getenv('NOTION_DB_ID', '2c75dacf4f1481da8426d2e4411aa286')

CLOUDINARY_CLOUD_NAME    = 'dsc0jsbkz'
CLOUDINARY_UPLOAD_PRESET = 'blog_uploads'

NOTION_HEADERS = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
}

TYPE_TO_CATEGORY = {
    '💡 Aha':       'Estrategia',
    '⚔️ Conflicto': 'Marketing',
    '⚙️ Sistema':   'Growth',
    '🔥 Opinión':   'Estrategia',
    '🏆 Victoria':  'Growth',
}

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json')


def create_slug(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'[^\w-]+', '', text)
    return re.sub(r'--+', '-', text)


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


def fetch_published_pages():
    """
    La base del Blog Content Calendar es multi-source y no se puede consultar
    directamente. Buscamos las páginas más recientes del workspace y
    filtramos por database_id + Status en (Published, Ready).
    Paginamos hasta MAX_PAGES páginas para no colgar el script.
    """
    target_db = NOTION_DB_ID.replace('-', '')
    published = []
    cursor = None
    MAX_PAGES = 15  # máximo 1500 resultados del workspace

    for _ in range(MAX_PAGES):
        body = {
            'filter': {'value': 'page', 'property': 'object'},
            'page_size': 100,
            'sort': {'direction': 'descending', 'timestamp': 'last_edited_time'},
        }
        if cursor:
            body['start_cursor'] = cursor

        r = requests.post('https://api.notion.com/v1/search',
                          headers=NOTION_HEADERS, json=body)
        r.raise_for_status()
        data = r.json()
        pages = data.get('results', [])

        for page in pages:
            parent = page.get('parent', {})
            page_db = (parent.get('database_id') or '').replace('-', '')
            if page_db != target_db:
                continue
            props = page.get('properties', {})
            status_val = props.get('Status', {}).get('select', {})
            status = status_val.get('name', '') if status_val else ''
            if status in ('Published', 'Ready'):
                published.append(page)

        if not data.get('has_more'):
            break
        cursor = data.get('next_cursor')

    return published


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

        if btype == 'heading_1':      lines.append(f'\n# {text}')
        elif btype == 'heading_2':    lines.append(f'\n## {text}')
        elif btype == 'heading_3':    lines.append(f'\n### {text}')
        elif btype in ('bulleted_list_item', 'numbered_list_item'):
            lines.append(f'- {text}')
        elif btype == 'paragraph' and text:
            lines.append(text)
        elif btype == 'divider':
            lines.append('\n---\n')

    return '\n'.join(lines).strip()


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
    if not HAS_ANTHROPIC or not ANTHROPIC_KEY:
        print('  ⚠️  Sin ANTHROPIC_API_KEY — usando contenido original')
        return draft_content

    client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
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


def _wrap_text(draw, text, font, max_width):
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
    if not HAS_PILLOW:
        return None

    W, H = 1200, 630
    img = Image.new('RGB', (W, H))
    pixels = img.load()
    c0 = (3,  33,  73)
    c1 = (26, 54,  144)
    c2 = (15, 174, 193)
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

    draw = ImageDraw.Draw(img)
    font_size = 64 if len(title) > 60 else 72 if len(title) > 45 else 80
    font = None
    for path in [
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
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


def upload_cover_to_cloudinary(title, existing_image_url=''):
    """Reutiliza la imagen existente si ya hay una URL, si no genera una nueva."""
    if existing_image_url:
        return existing_image_url

    image_bytes = generate_cover_bytes(title)
    if not image_bytes:
        return ''

    filename = f'cover-{int(time.time())}.png'
    url = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/image/upload'
    r = requests.post(url,
                      files={'file': (filename, image_bytes, 'image/png')},
                      data={'upload_preset': CLOUDINARY_UPLOAD_PRESET})
    r.raise_for_status()
    return r.json().get('secure_url', '')


def load_existing_cache():
    """Carga el JSON actual para no regenerar posts que ya están en cache."""
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return {p['slug']: p for p in data if 'slug' in p}
    return {}


def main():
    print('=' * 60)
    print('Growth4U — Rebuild Posts Cache from Notion')
    print('=' * 60)

    if not NOTION_TOKEN:
        print('❌ NOTION_TOKEN no configurado en .env')
        return

    # Cargar cache existente para no regenerar lo que ya está
    existing = load_existing_cache()
    print(f'\n📂 Cache existente: {len(existing)} posts')

    print('\n📋 Buscando posts en Notion (Published + Ready)...')
    pages = fetch_published_pages()
    print(f'   Encontrados: {len(pages)} posts\n')

    posts_by_slug = dict(existing)  # slug → post dict
    new_count = 0

    for i, page in enumerate(pages, 1):
        props   = page['properties']
        page_id = page['id']
        title   = get_prop_text(props, 'Title')
        ltype   = get_prop_select(props, 'Blog Type')
        category = TYPE_TO_CATEGORY.get(ltype, 'Estrategia')
        slug    = create_slug(title)
        status  = (props.get('Status', {}).get('select', {}) or {}).get('name', '')

        print(f'[{i}/{len(pages)}] {title[:55]}')

        # Si ya está en el cache, saltar
        if slug in posts_by_slug:
            print('  ⏭️  Ya en cache. Saltando.\n')
            continue

        # Obtener contenido de Notion
        draft_content = fetch_page_content(page_id)
        if not draft_content:
            print('  ⚠️  Sin contenido en Notion. Saltando.\n')
            continue

        # Generar contenido GEO
        print('  🤖 Generando GEO con Claude...')
        try:
            geo_content = generate_geo_content(title, draft_content, category)
        except Exception as e:
            print(f'  ❌ Error Claude: {e}\n')
            continue

        lines = [l for l in geo_content.split('\n') if l.strip() and not l.startswith('#')]
        excerpt = lines[0][:200] if lines else title

        # Subir portada (o reutilizar si ya existe en cache por otro medio)
        try:
            image_url = upload_cover_to_cloudinary(title)
            if image_url:
                print(f'  🖼️  Portada lista')
        except Exception as e:
            print(f'  ⚠️  Error portada: {e}')
            image_url = ''

        now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        posts_by_slug[slug] = {
            'id': slug,
            'title': title,
            'slug': slug,
            'category': category,
            'excerpt': excerpt,
            'content': geo_content,
            'image': image_url,
            'readTime': '6 min lectura',
            'author': 'Equipo Growth4U',
            'createdAt': now,
            'updatedAt': now,
        }
        new_count += 1
        print(f'  ✅ Añadido al cache ({new_count} nuevos hasta ahora)\n')
        time.sleep(1)  # pequeña pausa entre llamadas a Claude

    # Guardar
    all_posts = list(posts_by_slug.values())
    # Ordenar por createdAt desc
    all_posts.sort(key=lambda p: p.get('createdAt') or '', reverse=True)

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_posts, f, ensure_ascii=False, indent=2)

    print('=' * 60)
    print(f'✅ Cache guardado: {len(all_posts)} posts en {OUTPUT_FILE}')
    print(f'   {new_count} nuevos + {len(existing)} ya existentes')
    print()
    print('Ahora ejecuta el commit y deploy:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "chore: rebuild posts cache from Notion"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
