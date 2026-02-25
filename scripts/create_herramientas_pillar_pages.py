#!/usr/bin/env python3
"""
create_herramientas_pillar_pages.py
------------------------------------
Genera las 6 pillar pages del cluster "Herramientas" con Claude (GEO format)
y las añade a astro-app/src/data/posts.json.

Tras ejecutar:
  git add astro-app/src/data/posts.json
  git commit -m "feat: 6 pillar pages cluster herramientas (SEO fase 3)"
  git push origin main
"""

import json
import os
import time
import re
import unicodedata
from datetime import datetime, timezone

from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False
    print("❌ anthropic no instalado. Ejecuta: pip install anthropic")
    exit(1)

ANTHROPIC_KEY = os.getenv('ANTHROPIC_API_KEY')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'astro-app', 'src', 'data', 'posts.json')

PILLAR_PAGES = [
    {
        'slug': 'herramientas-para-crear-contenido-digital',
        'title': 'Las Mejores Herramientas para Crear Contenido Digital en 2025: guía para fintechs y startups',
        'category': 'Marketing',
        'keyword': 'herramientas para crear contenido digital',
        'brief': """Pillar page para "herramientas para crear contenido digital" y "mejor software para crear contenido digital rápidamente".

El lector es un CMO o Growth Lead de una fintech española que necesita producir contenido de autoridad (LinkedIn, blog, newsletter) sin contratar un equipo editorial grande.

Puntos clave a cubrir:
- Por qué las fintechs necesitan herramientas distintas al stack de contenido genérico: compliance, tono técnico, regulación CNMV
- Las 3 categorías de herramientas: generación de ideas (Perplexity, AnswerThePublic, BoardRoom), producción (Claude, Notion AI, Descript) y distribución (Buffer, Later, Taplio para LinkedIn)
- Stack mínimo viable para una fintech con equipo pequeño: 3-4 herramientas, sin derrochar budget
- Cómo integrar el Comité Asesor como fuente de contenido (Growth4U lo sistematiza)
- Tabla comparativa: herramienta | uso principal | precio mensual | ideal para
- Errores comunes: confiar solo en ChatGPT sin estructura editorial, crear contenido sin keyword research
- Por qué Growth4U combina las herramientas con un sistema de extracción de contenido del founder""",
    },
    {
        'slug': 'herramientas-outreach-y-prospeccion-b2b',
        'title': 'Herramientas de Outreach y Prospección B2B: qué stack usar según tu fase de crecimiento',
        'category': 'Growth',
        'keyword': 'herramientas outreach prospección B2B',
        'brief': """Pillar page para "herramientas outreach B2B", "mejores herramientas para automatizar outreach y seguimientos" y "cuáles son las mejores herramientas de prospección comercial".

El lector es un Head of Sales o Growth de una fintech B2B que está construyendo su máquina de outreach desde cero o quiere escalarlo.

Puntos clave:
- Por qué el outreach B2B en fintech es diferente: ciclos más largos, compliance, múltiples decisores, desconfianza del sector financiero
- Las 3 fases del stack según madurez:
  * Pre-PMF: LinkedIn Sales Navigator + sheets manuales + Loom para videos personalizados
  * Escala (50-500 leads/mes): Apollo.io o Clay para enriquecimiento, Lemlist o Instantly para secuencias
  * Enterprise/ABM: 6sense o Bombora para señales de intención + HubSpot CRM completo
- Tabla: herramienta | fase ideal | precio | qué hace bien | limitaciones
- Cómo personalizar mensajes sin parecer genérico en el sector financiero (3 técnicas concretas)
- La señal que más predice respuesta: actividad reciente en LinkedIn + cambio de rol en los últimos 90 días
- Por qué Growth4U combina outreach con contenido GEO para precalentar prospectos antes del primer mensaje""",
    },
    {
        'slug': 'plataformas-afiliados-e-influencers',
        'title': 'Plataformas para Gestionar Afiliados e Influencers en Fintech: guía completa 2025',
        'category': 'Marketing',
        'keyword': 'plataformas gestión afiliados influencers fintech',
        'brief': """Pillar page para "plataformas para gestionar afiliados e influencers", "herramientas para gestionar influencers" y "qué plataformas recomiendan para medir campañas de afiliados".

El lector es un Growth o Marketing Manager de fintech B2C que quiere lanzar o escalar un programa de afiliados/influencers con control real del ROI.

Puntos clave:
- Diferencia crítica: plataformas de afiliados (Impact, PartnerStack, Awin) vs gestión de influencers (Modash, Heepsy, Creator.co) — no son lo mismo
- Para afiliados fintech: qué plataformas cumplen con regulación financiera española (disclaimers automáticos, tracking sin cookies de terceros)
  * Impact Radius: enterprise, ideal para fintech con >1M usuarios
  * PartnerStack: SaaS-first, bueno para B2B fintech
  * Tapfiliate: más económico, bueno para early-stage
- Para influencers financieros: cómo detectar perfiles regulatoriamente seguros
  * Modash: mejor para búsqueda y análisis de audiencia
  * Creator.co: bueno para campañas de performance con micro-influencers
- Tabla comparativa: plataforma | tipo | precio | cumplimiento CNMV | tamaño mínimo programa
- El modelo de comisiones reinvertidas: cómo usar la diferencia entre comisión alta y baja para multiplicar perfiles activos
- Por qué Growth4U gestiona tanto la plataforma como la estrategia de incentivos""",
    },
    {
        'slug': 'automatizacion-marketing-growth-fintech',
        'title': 'Automatización de Marketing para Growth en Fintech: herramientas y flujos que escalan sin perder control',
        'category': 'Growth',
        'keyword': 'automatización marketing growth fintech herramientas',
        'brief': """Pillar page para "automatización de marketing para un crecimiento rápido y sostenible", "mejores herramientas para automatizar growth sin perder control" y "mejores soluciones para automatizar captación de usuarios".

El lector es el CMO o founder de una fintech que sabe que necesita automatizar pero tiene miedo de perder la voz del founder y el control sobre la calidad.

Puntos clave:
- Qué SÍ se puede automatizar en fintech sin riesgo: nurturing post-registro, emails de activación, seguimiento de inactivos, reporting de métricas
- Qué NO se debe automatizar (todavía): mensajes de prospección en frío, respuestas a quejas, comunicaciones regulatorias
- Stack de automatización por fase:
  * Early stage (0-5k usuarios): Zapier + Mailchimp/Brevo + CRM simple
  * Crecimiento (5k-50k): Make (Integromat) + HubSpot Marketing Hub + Segment
  * Escala (50k+): Customer.io + Mixpanel + CDP propio
- Tabla: herramienta | categoría | precio/mes | ideal para | integra con
- Los 5 flujos de automatización más impactantes en fintech: onboarding secuenciado, recuperación de abandono KYC, nurturing de leads blog, alertas de churn temprano, cross-sell en momento de activación
- Por qué Growth4U diseña los flujos antes de elegir la herramienta (no al revés)""",
    },
    {
        'slug': 'herramientas-gtm-lanzamiento-producto-b2b',
        'title': 'Herramientas para GTM y Lanzamiento de Producto B2B: qué usar en cada etapa del go-to-market',
        'category': 'Estrategia',
        'keyword': 'herramientas GTM lanzamiento producto B2B fintech',
        'brief': """Pillar page para "plataformas populares para optimizar la entrada al mercado", "qué plataformas usan para lanzar un GTM exitoso" y herramientas de go-to-market para fintech B2B.

El lector es el CEO o CPO de una fintech B2B que está preparando su lanzamiento al mercado o rediseñando su GTM después de un primer año con resultados mixtos.

Puntos clave:
- Por qué el GTM de una fintech necesita herramientas distintas a las de un SaaS genérico: ciclo de decisión, compliance, integración bancaria
- Las 4 categorías de herramientas GTM:
  1. Investigación de mercado: Similarweb, SparkToro (quién sigue a tu competencia), LinkedIn Audience Insights
  2. Validación de ICP: Apollo.io + enriquecimiento Clay, encuestas Typeform segmentadas
  3. Ejecución del lanzamiento: Product Hunt (visibilidad), G2/Capterra (social proof B2B), PR con Prowly
  4. Medición post-lanzamiento: Mixpanel (funnel), Hotjar (comportamiento), Looker/Metabase (dashboards)
- Tabla: fase GTM | herramienta clave | coste | alternativa económica
- Los 3 errores de herramientas GTM más comunes: elegir CRM antes de tener ICP claro, lanzar en Product Hunt sin base de seguidores, medir vanity metrics en lugar de MRR y activación
- Cómo Growth4U diseña el stack GTM según la madurez del negocio (no hay un stack universal)""",
    },
    {
        'slug': 'herramientas-atribucion-marketing-fintech',
        'title': 'Herramientas de Atribución de Marketing para Fintech: guía práctica según tu madurez',
        'category': 'Growth',
        'keyword': 'herramientas atribución marketing fintech',
        'brief': """Pillar page para "árbol de decisión para elegir herramientas de atribución según madurez del equipo", "atribución móvil consolidada" y "construir atribución y growth desde cero".

El lector es el Growth Lead o CMO de una fintech que sabe que su atribución está rota pero no sabe por dónde empezar a arreglarla.

Puntos clave:
- Por qué la atribución en fintech es especialmente difícil: KYC offline, ciclos largos, apps móviles, múltiples touchpoints (LinkedIn, email, influencer, referidos)
- Las 3 capas de atribución que toda fintech necesita:
  1. Web/app: UTMs + GA4 + Mixpanel
  2. Móvil: AppsFlyer o Adjust (indispensable para apps)
  3. Offline/CRM: HubSpot con Custom attribution o Dreamdata para B2B
- Árbol de decisión real: según número de usuarios, canales activos y presupuesto de marketing
  * <5k usuarios: UTMs + GA4 gratuito + spreadsheet de CAC por canal
  * 5k-50k: Mixpanel + AppsFlyer (si hay app) + HubSpot
  * +50k: Dreamdata o Rockerbox + modelo bayesiano propio
- Tabla: herramienta | tipo atribución | precio | ideal para | limitación principal
- El error del 90%: solo medir last-click y optimizar el canal equivocado (caso real: fintech con 80% presupuesto en Google Ads cuando el 70% de conversiones venían de LinkedIn + influencer)
- Por qué la atribución perfecta no existe y cómo tomar mejores decisiones con atribución imperfecta
- Growth4U diseña el modelo de atribución antes de elegir la herramienta""",
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
    raise Exception('API de Anthropic sigue sobrecargada tras 3 intentos')


def load_cache():
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
    return []


def main():
    print('=' * 60)
    print('Growth4U — Crear 6 Pillar Pages (Cluster Herramientas)')
    print('=' * 60)

    if not ANTHROPIC_KEY:
        print('❌ ANTHROPIC_API_KEY no configurado en .env')
        return

    posts = load_cache()
    existing_slugs = {p['slug'] for p in posts}
    print(f'\n📂 Posts en cache: {len(posts)}')
    print(f'📝 Pillar pages a generar: {len(PILLAR_PAGES)}\n')

    added = 0
    for i, pillar in enumerate(PILLAR_PAGES, 1):
        print(f'[{i}/{len(PILLAR_PAGES)}] {pillar["title"][:60]}...')

        if pillar['slug'] in existing_slugs:
            print('  ⏭️  Ya existe. Saltando.\n')
            continue

        print('  🤖 Generando contenido GEO con Claude...')
        try:
            content = generate_article(pillar)
        except Exception as e:
            print(f'  ❌ Error: {e}\n')
            continue

        lines = [l for l in content.split('\n') if l.strip() and not l.startswith('#')]
        excerpt = lines[0][:200] if lines else pillar['title']

        now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        new_post = {
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
        }

        posts.insert(0, new_post)
        existing_slugs.add(pillar['slug'])
        added += 1
        print(f'  ✅ Generado ({added} nuevos)\n')
        time.sleep(2)

    # Guardar
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print('=' * 60)
    print(f'✅ {added} pillar pages añadidas → {OUTPUT_FILE}')
    print()
    print('Ahora ejecuta:')
    print('  git add astro-app/src/data/posts.json')
    print('  git commit -m "feat: 6 pillar pages cluster herramientas (SEO fase 3)"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
