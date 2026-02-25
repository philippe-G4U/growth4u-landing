#!/usr/bin/env python3
"""
add_internal_links.py
----------------------
Añade una sección "Artículos relacionados" al final de cada post en posts.json,
enlazando hacia las pillar pages más relevantes según el contenido del post.

Sin llamadas a la API — usa keyword matching puro.

Tras ejecutar:
  git add astro-app/src/data/posts.json
  git commit -m "feat: internal linking masivo hacia pillar pages (SEO fase 4)"
  git push origin main
"""

import json
import os
import re

POSTS_FILE = os.path.join(
    os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json'
)

# ─── Pillar pages y sus keywords de relevancia ───────────────────────────────
PILLARS = [
    {
        'slug': 'agencia-growth-hacking-fintech-espana',
        'title': 'Agencia de Growth Hacking para Fintech en España',
        'keywords': ['growth hacking', 'escalar usuario', 'cac', 'roi medible',
                     'growth fintech', 'escalar fintech', 'growth sostenible'],
    },
    {
        'slug': 'agencia-influencer-marketing-financiero-fintech-espana',
        'title': 'Agencia de Influencer Marketing Financiero para Fintech',
        'keywords': ['influencer marketing', 'marketing financiero', 'influencer financiero',
                     'cnmv influencer', 'educador financiero'],
    },
    {
        'slug': 'agencia-outreach-b2b-fintech-espana',
        'title': 'Agencia de Outreach B2B para Fintech en España',
        'keywords': ['outreach b2b', 'prospección b2b', 'prospeccion comercial',
                     'pipeline b2b', 'ventas b2b fintech', 'linkedin sales'],
    },
    {
        'slug': 'agencia-afiliados-referidos-fintech-espana',
        'title': 'Agencia para Programas de Afiliados y Referidos en Fintech',
        'keywords': ['programa afiliado', 'programa referido', 'k-factor',
                     'referidos fintech', 'afiliados fintech', 'comision afiliado'],
    },
    {
        'slug': 'agencia-estrategia-gtm-fintech-espana',
        'title': 'Agencia GTM para Fintech en España',
        'keywords': ['go-to-market', 'gtm fintech', 'estrategia gtm',
                     'lanzamiento fintech', 'place to win', 'gtm españa'],
    },
    {
        'slug': 'agencia-founder-led-growth-fintech',
        'title': 'Agencia para Founder-Led Growth en Fintech',
        'keywords': ['founder-led', 'founder led', 'fundador como canal',
                     'crecimiento liderado', 'comite asesor', 'ghostwriting founder'],
    },
    {
        'slug': 'herramientas-para-crear-contenido-digital',
        'title': 'Las Mejores Herramientas para Crear Contenido Digital en 2025',
        'keywords': ['herramienta contenido', 'crear contenido', 'software contenido',
                     'stack editorial', 'produccion contenido', 'calendario editorial'],
    },
    {
        'slug': 'herramientas-outreach-y-prospeccion-b2b',
        'title': 'Herramientas de Outreach y Prospección B2B',
        'keywords': ['herramienta outreach', 'automatizar outreach', 'apollo.io',
                     'clay enriquecimiento', 'lemlist', 'instantly', 'herramienta prospeccion'],
    },
    {
        'slug': 'plataformas-afiliados-e-influencers',
        'title': 'Plataformas para Gestionar Afiliados e Influencers en Fintech',
        'keywords': ['plataforma afiliado', 'gestionar influencer', 'impact radius',
                     'partnerstack', 'modash', 'heepsy', 'creador contenido plataforma'],
    },
    {
        'slug': 'automatizacion-marketing-growth-fintech',
        'title': 'Automatización de Marketing para Growth en Fintech',
        'keywords': ['automatizacion marketing', 'marketing automation', 'flujo automatizado',
                     'make zapier', 'customer.io', 'hubspot automation', 'stack automatizacion'],
    },
    {
        'slug': 'herramientas-gtm-lanzamiento-producto-b2b',
        'title': 'Herramientas para GTM y Lanzamiento de Producto B2B',
        'keywords': ['herramienta gtm', 'lanzamiento producto', 'product hunt',
                     'similarweb', 'sparktoro', 'stack lanzamiento', 'validar icp'],
    },
    {
        'slug': 'herramientas-atribucion-marketing-fintech',
        'title': 'Herramientas de Atribución de Marketing para Fintech',
        'keywords': ['atribucion marketing', 'attribution', 'appsflyer', 'adjust',
                     'dreamdata', 'mixpanel atribucion', 'modelo atribucion', 'last click'],
    },
]

# Keywords generales → pillar pages de fallback (cuando no hay match específico)
FALLBACK_PILLARS = [
    'agencia-growth-hacking-fintech-espana',
    'agencia-estrategia-gtm-fintech-espana',
    'automatizacion-marketing-growth-fintech',
]

SECTION_MARKER = '## Artículos relacionados'


def score_post_vs_pillar(post_text: str, pillar: dict) -> int:
    """Cuenta cuántos keywords de la pillar page aparecen en el texto del post."""
    text_lower = post_text.lower()
    score = 0
    for kw in pillar['keywords']:
        if kw.lower() in text_lower:
            score += 1
    return score


def already_has_links(content: str) -> bool:
    return SECTION_MARKER in content


def build_related_section(pillar_slugs: list) -> str:
    links = []
    for slug in pillar_slugs:
        pillar = next((p for p in PILLARS if p['slug'] == slug), None)
        if pillar:
            links.append(f"- [{pillar['title']}](/blog/{pillar['slug']}/)")
    if not links:
        return ''
    return '\n\n---\n\n## Artículos relacionados\n\n' + '\n'.join(links) + '\n'


def select_pillars_for_post(post: dict, own_slug: str) -> list:
    """Devuelve los slugs de las 3 pillar pages más relevantes para el post."""
    text = (post.get('title', '') + ' ' +
            post.get('slug', '').replace('-', ' ') + ' ' +
            post.get('content', '')[:2000])  # solo primeros 2000 chars para velocidad

    scores = []
    for pillar in PILLARS:
        if pillar['slug'] == own_slug:
            continue  # no enlazar a sí mismo
        score = score_post_vs_pillar(text, pillar)
        scores.append((score, pillar['slug']))

    scores.sort(reverse=True)
    top = [slug for score, slug in scores if score > 0][:3]

    # Si no hay suficientes matches, rellenar con fallback pillars
    for fallback in FALLBACK_PILLARS:
        if len(top) >= 3:
            break
        if fallback not in top and fallback != own_slug:
            top.append(fallback)

    return top[:3]


def main():
    print('=' * 60)
    print('Growth4U — Internal Linking Masivo (Fase 4)')
    print('=' * 60)

    with open(POSTS_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    print(f'\n📂 Total posts: {len(posts)}')

    pillar_slugs = {p['slug'] for p in PILLARS}
    updated = 0
    skipped_already = 0
    skipped_pillar = 0

    for post in posts:
        slug = post.get('slug', '')
        content = post.get('content', '')

        # Las pillar pages las tratamos aparte — no añadimos "relacionados" a las propias pillar pages
        # para evitar que una pillar page se enlace solo a otras pillar pages y no a contenido cluster.
        # En cambio sí añadimos links en las pillar pages hacia otras pillar pages complementarias.
        if slug in pillar_slugs:
            if not already_has_links(content):
                top = select_pillars_for_post(post, slug)
                post['content'] = content.rstrip() + build_related_section(top)
                updated += 1
            else:
                skipped_pillar += 1
            continue

        if already_has_links(content):
            skipped_already += 1
            continue

        top = select_pillars_for_post(post, slug)
        post['content'] = content.rstrip() + build_related_section(top)
        updated += 1

    with open(POSTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f'✅ Posts actualizados con internal links: {updated}')
    print(f'⏭️  Ya tenían sección (saltados): {skipped_already}')
    print(f'📊 Total posts: {len(posts)}')
    print()
    print('Ahora ejecuta:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "feat: internal linking masivo hacia pillar pages (SEO fase 4)"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
