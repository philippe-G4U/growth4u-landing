#!/usr/bin/env python3
"""
generate_covers.py
-------------------
Genera portadas 1200×630 para todos los posts sin imagen en posts.json
y las sube a Cloudinary. Mismo estilo visual que el generador del admin.

Tras ejecutar:
  git add astro-app/src/data/posts.json
  git commit -m "feat: portadas para pillar pages"
  git push origin main
"""

import io
import json
import os
import time

import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print('❌ Pillow no instalado. Ejecuta: pip install Pillow')
    exit(1)

CLOUDINARY_CLOUD_NAME   = 'dsc0jsbkz'
CLOUDINARY_UPLOAD_PRESET = 'blog_uploads'
POSTS_FILE = os.path.join(
    os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json'
)


def _wrap_text(draw, text, font, max_width):
    words = text.split()
    lines, current = [], ''
    for word in words:
        test = (current + ' ' + word).strip()
        if draw.textlength(test, font=font) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def generate_cover_bytes(title):
    """Gradiente navy→azul→teal, overlay oscuro, título centrado en blanco."""
    W, H = 1200, 630
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
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
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


def upload_to_cloudinary(image_bytes, slug):
    filename = f'cover-{slug[:40]}-{int(time.time())}.png'
    url = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/image/upload'
    r = requests.post(
        url,
        files={'file': (filename, image_bytes, 'image/png')},
        data={'upload_preset': CLOUDINARY_UPLOAD_PRESET},
        timeout=30,
    )
    r.raise_for_status()
    return r.json().get('secure_url', '')


def main():
    print('=' * 55)
    print('Growth4U — Generar portadas para posts sin imagen')
    print('=' * 55)

    with open(POSTS_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    pending = [p for p in posts if not p.get('image', '')]
    print(f'\n📷 Posts sin imagen: {len(pending)}\n')

    if not pending:
        print('✅ Todos los posts tienen imagen. Nada que hacer.')
        return

    done = 0
    for i, post in enumerate(pending, 1):
        slug  = post['slug']
        title = post['title']
        print(f'[{i}/{len(pending)}] {title[:55]}...')
        try:
            img_bytes = generate_cover_bytes(title)
            image_url = upload_to_cloudinary(img_bytes, slug)
            # Actualizar en el array original
            for p in posts:
                if p['slug'] == slug and not p.get('image', ''):
                    p['image'] = image_url
                    break
            done += 1
            print(f'  ✅ {image_url[:70]}')
            time.sleep(0.5)
        except Exception as e:
            print(f'  ❌ Error: {e}')

    with open(POSTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f'\n✅ {done}/{len(pending)} portadas generadas → posts.json actualizado')
    print('\nAhora ejecuta:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "feat: portadas para las 15 pillar pages"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
