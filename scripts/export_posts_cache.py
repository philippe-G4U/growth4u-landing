#!/usr/bin/env python3
"""
export_posts_cache.py
---------------------
Lee TODOS los posts de Firebase Firestore y los guarda en
astro-app/src/data/posts.json para que el build de Netlify
no dependa de llamadas de red a Firestore.

Uso:
  python scripts/export_posts_cache.py

Tras ejecutar, haz commit del archivo posts.json generado.
"""

import json
import os
import re
import unicodedata
import urllib.request

FIREBASE_PROJECT_ID = 'landing-growth4u'
FIREBASE_APP_ID     = 'growth4u-public-app'
FIRESTORE_BASE      = f'https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents'
COLLECTION_PATH     = f'artifacts/{FIREBASE_APP_ID}/public/data/blog_posts'
FIREBASE_API_KEY    = 'AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw'

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json')


def create_slug(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'[^\w-]+', '', text)
    return re.sub(r'--+', '-', text)


def parse_firestore_value(value):
    if 'stringValue' in value:   return value['stringValue']
    if 'integerValue' in value:  return int(value['integerValue'])
    if 'doubleValue' in value:   return value['doubleValue']
    if 'booleanValue' in value:  return value['booleanValue']
    if 'timestampValue' in value: return value['timestampValue']
    if 'nullValue' in value:     return None
    if 'arrayValue' in value:
        return [parse_firestore_value(v) for v in value['arrayValue'].get('values', [])]
    if 'mapValue' in value:
        return {k: parse_firestore_value(v) for k, v in value['mapValue'].get('fields', {}).items()}
    return None


def fetch_all_posts():
    posts = []
    page_token = None

    while True:
        url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}?pageSize=300&key={FIREBASE_API_KEY}'
        if page_token:
            url += f'&pageToken={page_token}'

        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))

        for doc in data.get('documents', []):
            fields = doc.get('fields', {})
            doc_id = doc['name'].split('/')[-1]
            d = {k: parse_firestore_value(v) for k, v in fields.items()}
            d['_id'] = doc_id
            posts.append({
                'id': d['_id'],
                'title': d.get('title', ''),
                'slug': create_slug(d.get('title', '')),
                'category': d.get('category', 'Estrategia'),
                'excerpt': d.get('excerpt', ''),
                'content': d.get('content', ''),
                'image': d.get('image', ''),
                'readTime': d.get('readTime', '6 min lectura'),
                'author': d.get('author', 'Equipo Growth4U'),
                'createdAt': d.get('createdAt') or None,
                'updatedAt': d.get('updatedAt') or None,
            })

        page_token = data.get('nextPageToken')
        if not page_token:
            break

    return posts


def main():
    print('Exportando posts desde Firebase...')
    try:
        posts = fetch_all_posts()
    except Exception as e:
        print(f'❌ Error: {e}')
        return

    print(f'✅ {len(posts)} posts encontrados')

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f'✅ Guardado en {OUTPUT_FILE}')
    print()
    print('Ahora ejecuta:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "chore: update posts cache"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
