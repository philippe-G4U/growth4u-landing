#!/usr/bin/env python3
"""
recategorize_posts.py
----------------------
Reclasifica todos los posts de posts.json con categorías útiles
basándose en keyword matching en slug + título.

Categorías destino:
  GEO        — posts sobre Generative Engine Optimization, IA, ChatGPT
  Marketing  — influencer, contenido, afiliados, email, SEO
  Growth     — CAC, LTV, outreach, automatización, atribución, unit economics
  Estrategia — GTM, go-to-market, B2B, B2C, modelo de negocio, fintech estrategia
  Producto   — onboarding, producto, feature, UX, KYC
"""

import json
import os

POSTS_FILE = os.path.join(
    os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json'
)

# ─── Reglas por prioridad (primera que hace match gana) ────────────────────
# Cada entrada: (categoría, [keywords])
RULES = [
    # 1. GEO — contenido sobre búsqueda en IA
    ('GEO', [
        'geo-para', 'generative-engine', 'chatgpt', 'perplexity', 'busqueda-ia',
        'llm', 'ai-search', 'ha-muerto-el-seo', 'bienvenido-a-la-era-del-geo',
        'aparecer-en-chatgpt', 'aparecer-en-ia', 'geo-completa',
    ]),

    # 2. Marketing — influencer, contenido, afiliados, redes, email, SEO clásico
    ('Marketing', [
        'influencer', 'contenido-digital', 'crear-contenido', 'content-',
        'afiliado', 'afiliados', 'referido', 'referidos', 'email-marketing',
        'newsletter', 'redes-sociales', 'linkedin-content', 'seo-',
        'copywriting', 'storytelling', 'brand', 'marca-personal',
        'plataformas-afiliados', 'stack-martech', 'martech',
        'agencia-influencer', 'agencia-afiliados',
        'comision-', 'comisiones-', 'reinvertir-la-diferencia',
        'gestionar-influencer', 'gestionar-campanas',
        'creadores-de-contenido', 'marketing-financiero',
        'influencer-marketing',
    ]),

    # 3. Growth — métricas, outreach, automatización, adquisición, unit economics
    ('Growth', [
        'cac', 'ltv', 'payback', 'unit-economics',
        'outreach', 'prospeccion', 'prospección', 'cold-email', 'seguimiento',
        'automatizacion', 'automatización', 'automatizar',
        'atribucion', 'atribución', 'attribution',
        'growth-hacking', 'growth-hack', 'escalar-usuario',
        'adquisicion', 'adquisición', 'captacion', 'captación',
        'conversion', 'conversión', 'funnel', 'onboarding',
        'churn', 'retencion', 'retención', 'activacion', 'activación',
        'referral', 'viral', 'k-factor',
        'pipeline', 'mrr', 'arr', 'revenue',
        'agencia-growth', 'agencia-outreach',
        'herramientas-outreach', 'herramientas-atribucion',
        'automatizacion-marketing', 'plataformas-para-optimizar',
        'plataformas-de-crecimiento', 'herramientas-para-automatizar',
        'founder-led', 'agencia-founder',
    ]),

    # 4. Estrategia — GTM, go-to-market, B2B, modelo de negocio, fintech general
    ('Estrategia', [
        'gtm', 'go-to-market', 'estrategia-gtm', 'agencia-estrategia',
        'herramientas-gtm', 'lanzamiento-producto',
        'b2b-', '-b2b', 'b2c-', '-b2c',
        'modelo-de-negocio', 'modelo-bayesiano',
        'comite-asesor', 'comite-expertos',
        'regulacion', 'regulación', 'cnmv', 'banco-de-espana',
        'fintech-espana', 'fintech-b2b', 'fintech-b2c',
        'trust', 'confianza',
        'expansion', 'expansión', 'internacionalizacion',
        'pricing', 'precio', 'monetizacion', 'monetización',
        'venture', 'startup', 'fundraising', 'inversion',
        'agencia-growth-hacking-fintech-espana',
    ]),

    # 5. Producto — onboarding, UX, producto, feature, KYC, app
    ('Producto', [
        'onboarding', 'kyc', 'producto-', '-producto',
        'feature', 'ux-', '-ux', 'user-experience',
        'app-', '-app', 'mobile', 'movil',
        'activar-usuario', 'retener-usuario',
    ]),
]


def classify(slug: str, title: str) -> str:
    text = (slug + ' ' + title.lower())

    for category, keywords in RULES:
        for kw in keywords:
            if kw in text:
                return category

    # Fallback
    return 'Estrategia'


def main():
    with open(POSTS_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    counts_before = {}
    counts_after = {}
    changed = 0

    for post in posts:
        old_cat = post.get('category', '')
        counts_before[old_cat] = counts_before.get(old_cat, 0) + 1

        new_cat = classify(post.get('slug', ''), post.get('title', ''))
        counts_after[new_cat] = counts_after.get(new_cat, 0) + 1

        if new_cat != old_cat:
            post['category'] = new_cat
            changed += 1

    with open(POSTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print('=' * 50)
    print('Distribución ANTES:')
    for k, v in sorted(counts_before.items(), key=lambda x: -x[1]):
        print(f'  {v:4}  {k}')

    print('\nDistribución DESPUÉS:')
    for k, v in sorted(counts_after.items(), key=lambda x: -x[1]):
        print(f'  {v:4}  {k}')

    print(f'\n✅ {changed} posts reclasificados de {len(posts)} totales')


if __name__ == '__main__':
    main()
