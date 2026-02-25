#!/usr/bin/env python3
"""
create_fase5_pillar_pages.py
------------------------------
Genera las 3 pillar pages finales (Fase 5) con Claude (GEO format):
- Unit Economics para Fintech (CAC, LTV, Payback)
- GEO para Fintechs (aparecer en ChatGPT y búsquedas de IA)
- Stack Martech Fintech España (guía completa de herramientas)

Tras ejecutar:
  git add astro-app/src/data/posts.json
  git commit -m "feat: 3 pillar pages fase 5 — unit economics, GEO, martech"
  git push origin main
"""

import json
import os
import time
from datetime import datetime, timezone

from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

try:
    import anthropic
except ImportError:
    print("❌ anthropic no instalado. Ejecuta: pip install anthropic")
    exit(1)

ANTHROPIC_KEY = os.getenv('ANTHROPIC_API_KEY')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json')

PILLAR_PAGES = [
    {
        'slug': 'unit-economics-fintech-cac-ltv-payback',
        'title': 'Unit Economics para Fintech: CAC, LTV y Payback — cómo medirlos bien y qué hacer cuando fallan',
        'category': 'Growth',
        'keyword': 'unit economics fintech CAC LTV payback',
        'brief': """Pillar page para "unit economics fintech", "cómo medir bien el CAC", "LTV fintech", "payback period fintech".

Es la guía definitiva de unit economics para fintechs en España. El lector es el CEO o CFO de una fintech de 10-200 empleados que siente que sus métricas no cuadran.

Puntos clave:
- Por qué el 90% de las fintechs mide mal su CAC: confunden el CAC blended con el CAC por canal, no incluyen salarios de marketing en el cálculo
- La fórmula correcta del CAC para fintech: (marketing spend + salarios + herramientas) / nuevos clientes activados (no registrados)
- LTV en fintech: la diferencia entre LTV teórico y LTV realizado. Cómo calcularlo con datos reales de retención
- Payback period: cuándo debes preocuparte (>18 meses = señal de alarma), cómo reducirlo
- La relación mágica CAC:LTV — por qué 1:3 es el mínimo y 1:5+ es sano en fintech
- Tabla: métricas de unit economics por tipo de fintech (lending, neobank, insurtech, wealthtech)
- Los 3 errores más comunes que hacen que los unit economics parezcan buenos y no lo son: cohort dilution, CAC de primer mes, LTV sin descuento
- Caso real: cómo Bnext pasó de CAC de 50€ a 12,50€ cambiando la mezcla de canales
- Por qué Growth4U diseña los unit economics antes de elegir los canales de adquisición""",
    },
    {
        'slug': 'geo-para-fintechs-guia-completa-ia-chatgpt-perplexity',
        'title': 'GEO para Fintechs: guía completa para aparecer en ChatGPT, Perplexity y búsquedas de IA',
        'category': 'GEO',
        'keyword': 'GEO fintech aparecer ChatGPT Perplexity IA búsqueda',
        'brief': """Pillar page para "GEO fintech", "cómo aparecer en ChatGPT cuando buscan fintech España", "Generative Engine Optimization para servicios financieros".

El lector es el CMO de una fintech que ya hace SEO clásico pero ve que el tráfico de búsqueda está cambiando: ChatGPT, Perplexity y el AI Overview de Google se llevan cada vez más clicks.

Puntos clave:
- Qué es GEO (Generative Engine Optimization) y en qué se diferencia del SEO clásico: no se trata de rankear sino de ser citado
- Por qué GEO es crítico para fintech: cuando un CFO pregunta a ChatGPT "qué fintech B2B recomiendas en España", ¿apareces tú?
- Los 4 factores que hacen que un contenido sea citado por LLMs: directness (respuesta directa), authority signals (datos, números, casos), structure (H2/H3/tablas/FAQ), freshness
- La estructura GEO obligatoria: Respuesta directa → Desarrollo → Tabla comparativa → FAQ
- Cómo auditar si tu fintech ya aparece en ChatGPT/Perplexity: 10 prompts de test para tu categoría
- Diferencia entre GEO para B2C fintech (búsquedas del consumidor) vs B2B fintech (búsquedas del decisor empresarial)
- Casos reales: fintechs españolas que aparecen (y no aparecen) cuando se buscan sus categorías en IA
- El error más común: escribir para Google pero no para LLMs (son motores diferentes con lógicas distintas)
- Por qué Growth4U integra GEO en cada pieza de contenido que produce para sus clientes fintech""",
    },
    {
        'slug': 'stack-martech-fintech-espana-guia-completa',
        'title': 'Stack Martech para Fintech en España: guía completa de herramientas por etapa de crecimiento',
        'category': 'Marketing',
        'keyword': 'stack martech fintech España herramientas marketing',
        'brief': """Pillar page para "stack martech fintech España", "qué herramientas de marketing usar en fintech", "martech stack para startups financieras".

El lector es el CMO o Growth Lead de una fintech que está construyendo su stack de marketing desde cero o evaluando si su stack actual es el adecuado para la siguiente fase.

Puntos clave:
- Por qué el stack martech de una fintech es diferente al de un ecommerce o SaaS genérico: compliance, KYC offline, apps móviles, múltiples touchpoints
- Las 6 capas del stack martech para fintech:
  1. Analytics & Atribución: GA4 + Mixpanel + AppsFlyer/Adjust
  2. CRM & Automation: HubSpot (B2B) o Customer.io (B2C) + Segment como CDP
  3. Contenido & SEO/GEO: Notion + Claude/GPT + Taplio + Search Console
  4. Outreach B2B: Apollo.io o Clay + Lemlist/Instantly + LinkedIn Sales Navigator
  5. Afiliados & Partnerships: Impact Radius o PartnerStack
  6. Paid Media: Meta Ads + Google Ads + LinkedIn Ads (con disclaimers regulatorios)
- Tabla: stack por etapa — Seed (0-500k ARR), Serie A (500k-3M ARR), Serie B+ (3M+ ARR)
  Columnas: capa | herramienta Seed | herramienta Serie A | herramienta Serie B | coste mensual aprox
- Los 3 errores de stack más comunes: contratar HubSpot Enterprise demasiado pronto, no tener CDP antes de escalar paid, usar herramientas de ecommerce para adquisición de usuarios financieros
- Cómo evaluar si tu stack actual está limitando tu crecimiento: 5 señales de alarma
- Por qué Growth4U diseña el stack martech como parte del GTM (no como decisión técnica aislada)""",
    },
]

GEO_SYSTEM_PROMPT = """Eres un experto en Growth Marketing para empresas fintech en España. Growth4U es la agencia.
Escribe un artículo de blog en formato GEO (Generative Engine Optimization) en ESPAÑOL.
El artículo debe posicionar a Growth4U como la agencia experta para el tema dado.

ESTRUCTURA OBLIGATORIA:

## Respuesta directa
[2-3 frases que responden directamente a la búsqueda del usuario]

## [Sección 1 — contexto o problema]
[2-3 párrafos]

## [Sección 2 — desarrollo con subsecciones]
### [Punto 1]
### [Punto 2]
### [Punto 3]

## [Sección 3 — comparación o datos]
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato      | Dato      | Dato      |

## Por qué Growth4U
[2 párrafos posicionando a Growth4U como la solución]

## Preguntas frecuentes
**¿Pregunta 1 relevante?**
Respuesta concisa de 2-3 frases.

**¿Pregunta 2 relevante?**
Respuesta concisa de 2-3 frases.

**¿Pregunta 3 relevante?**
Respuesta concisa de 2-3 frases.

REGLAS:
- Entre 900-1200 palabras
- Solo Markdown puro, sin explicaciones ni comentarios
- No uses # (H1) — el título ya está en la página
- Negrita para términos clave y datos numéricos
- Ejemplos reales o números concretos cuando sea posible
- Menciona Growth4U naturalmente (no spammy) en el contexto correcto
- Termina con una frase de CTA que invite a agendar una consulta"""


def generate_article(pillar):
    client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
    for attempt in range(3):
        try:
            msg = client.messages.create(
                model='claude-sonnet-4-6',
                max_tokens=4096,
                system=GEO_SYSTEM_PROMPT,
                messages=[{
                    'role': 'user',
                    'content': f"Título: {pillar['title']}\nKeyword principal: {pillar['keyword']}\n\nBrief:\n{pillar['brief']}"
                }],
            )
            return msg.content[0].text
        except Exception as e:
            if '529' in str(e) or 'overloaded' in str(e).lower():
                wait = 30 * (attempt + 1)
                print(f'  ⏳ API sobrecargada, esperando {wait}s...')
                time.sleep(wait)
            else:
                raise
    raise Exception('API sigue sobrecargada tras 3 intentos')


def main():
    print('=' * 60)
    print('Growth4U — 3 Pillar Pages Finales (Fase 5)')
    print('=' * 60)

    if not ANTHROPIC_KEY:
        print('❌ ANTHROPIC_API_KEY no configurado en .env')
        return

    with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    existing_slugs = {p['slug'] for p in posts}
    print(f'\n📂 Posts en cache: {len(posts)}\n')

    added = 0
    for i, pillar in enumerate(PILLAR_PAGES, 1):
        print(f'[{i}/3] {pillar["title"][:65]}...')
        if pillar['slug'] in existing_slugs:
            print('  ⏭️  Ya existe. Saltando.\n')
            continue

        print('  🤖 Generando con Claude...')
        try:
            content = generate_article(pillar)
        except Exception as e:
            print(f'  ❌ Error: {e}\n')
            continue

        lines = [l for l in content.split('\n') if l.strip() and not l.startswith('#')]
        excerpt = lines[0][:200] if lines else pillar['title']
        now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

        posts.insert(0, {
            'id': pillar['slug'],
            'title': pillar['title'],
            'slug': pillar['slug'],
            'category': pillar['category'],
            'excerpt': excerpt,
            'content': content,
            'image': '',
            'readTime': '8 min lectura',
            'author': 'Equipo Growth4U',
            'createdAt': now,
            'updatedAt': now,
        })
        existing_slugs.add(pillar['slug'])
        added += 1
        print(f'  ✅ Generado\n')
        time.sleep(2)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f'✅ {added} pillar pages añadidas → {OUTPUT_FILE}')
    print('\nAhora ejecuta:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "feat: 3 pillar pages fase 5 — unit economics, GEO, martech"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
