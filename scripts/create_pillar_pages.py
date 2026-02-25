#!/usr/bin/env python3
"""
create_pillar_pages.py
----------------------
Genera las 6 pillar pages del cluster "Agencia" con Claude (GEO format)
y las añade a astro-app/src/data/posts.json.

Tras ejecutar:
  git add astro-app/src/data/posts.json
  git commit -m "feat: 6 pillar pages cluster agencia"
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
        'slug': 'agencia-growth-hacking-fintech-espana',
        'title': 'Agencia de Growth Hacking para Fintech en España: cómo escalar con CAC controlado y ROI medible',
        'category': 'Marketing',
        'keyword': 'agencia growth hacking fintech España',
        'brief': """Pillar page para la keyword "agencia growth hacking fintech España".

Growth4U es una agencia especializada en growth para empresas fintech en España.
Nuestro enfoque: CAC controlado, ROI medible, sin depender de paid ads.

Puntos clave a cubrir:
- Qué es el growth hacking aplicado a fintech (diferente al growth hacking genérico)
- Por qué las fintechs necesitan un enfoque específico (regulación, trust, ciclos de compra)
- Los 5 palancas de growth hacking que usamos: producto-led, referidos, contenido GEO, comunidad, activación
- Casos reales: Bnext (CAC de 50€ → 12,50€), Lydia (4-5x en 18 meses)
- Cómo evaluamos si una agencia de growth hacking entiende fintech de verdad
- Por qué Growth4U vs agencia generalista
- CTA: consulta estratégica gratuita""",
    },
    {
        'slug': 'agencia-influencer-marketing-financiero-fintech-espana',
        'title': 'Agencia de Influencer Marketing Financiero para Fintech en España',
        'category': 'Marketing',
        'keyword': 'agencia influencer marketing financiero fintech España',
        'brief': """Pillar page para "agencia influencer marketing financiero fintech España".

Puntos clave:
- Por qué el influencer marketing en fintech es diferente: regulación CNMV/Banco de España, disclaimers, perfil del influencer
- Los 3 perfiles de influencer que funcionan en fintech: educadores financieros, creadores de contenido sobre inversión/ahorro, founders de otras startups
- Modelo de comisiones vs fee fijo: cuándo usar cada uno
- Cómo medir el ROI del influencer marketing en fintech (CAC por canal, LTV de usuarios adquiridos por influencer)
- Errores más comunes: trabajar con influencers genéricos, no adaptar el mensaje al producto financiero
- Casos: estrategia de comisiones reinvertidas en más perfiles
- Por qué Growth4U entiende la regulación financiera española""",
    },
    {
        'slug': 'agencia-outreach-b2b-fintech-espana',
        'title': 'Agencia de Outreach B2B para Fintech en España: prospección efectiva desde PMF hasta Enterprise',
        'category': 'Growth',
        'keyword': 'agencia outreach B2B fintech España',
        'brief': """Pillar page para "agencia outreach B2B fintech España".

Puntos clave:
- Qué es el outreach B2B en fintech: diferencias entre prospección para SaaS vs fintech (ciclos más largos, compliance, múltiples decisores)
- Las 3 fases del outreach B2B según madurez: PMF (validación manual), escala (automatización selectiva), enterprise (account-based)
- Stack de herramientas para outreach fintech: LinkedIn Sales Navigator, Apollo/Clay, señales de intención
- Cómo personalizar mensajes para el sector financiero sin sonar genérico
- Métricas clave: tasa de respuesta, reuniones cualificadas, pipeline generado
- Errores del outreach B2B en fintech: mensajes genéricos, no entender el ciclo regulatorio
- Por qué Growth4U combina outreach con contenido GEO para precalentar prospectos""",
    },
    {
        'slug': 'agencia-afiliados-referidos-fintech-espana',
        'title': 'Agencia para Programas de Afiliados y Referidos en Fintech en España',
        'category': 'Growth',
        'keyword': 'agencia afiliados referidos fintech España',
        'brief': """Pillar page para "agencia afiliados fintech España".

Puntos clave:
- Diferencia entre programa de afiliados (terceros externos) y referidos (usuarios actuales)
- Por qué los referidos son el canal de menor CAC en fintech: trust transferido, LTV superior
- Diseño del programa: mecánica de incentivos (cash, producto, ambos), umbrales de activación, estructura de comisiones
- Cómo escalar afiliados: de 10 a 100 publishers sin perder calidad de usuario
- Regulación: qué se puede y no se puede prometer en publicidad de productos financieros
- Casos: estrategia de reinvertir la diferencia de comisión en más perfiles
- Métricas: k-factor, CAC via referidos vs otros canales, fraude y cómo detectarlo
- Por qué Growth4U gestiona el programa completo (diseño + tecnología + afiliados)""",
    },
    {
        'slug': 'agencia-estrategia-gtm-fintech-espana',
        'title': 'Agencia GTM para Fintech en España: diseña y ejecuta tu go-to-market según la madurez del negocio',
        'category': 'Estrategia',
        'keyword': 'agencia estrategia GTM fintech España',
        'brief': """Pillar page para "agencia GTM fintech España".

Puntos clave:
- Qué es un GTM en fintech y por qué es diferente al playbook de UK/US en España
- Las 4 fases del GTM según madurez: pre-PMF (nichos), early traction (canal principal), escala (multicanal), expansión (internacional)
- Por qué las fintechs copian estrategias de Revolut o N26 y fracasan: contexto regulatorio, confianza bancaria, competidores locales
- El Framework de Place to Win: elegir la batalla donde tus ventajas son mayores (caso Bnext vs N26: CAC 12,50€ vs 50€)
- Cómo diseñar el GTM de lanzamiento con regulador lento: estrategia de lista de espera, comunidad previa, contenido educativo
- Señales de que tu GTM actual no funciona: CAC subiendo, canales que no acumulan, equipos sin dirección
- Por qué Growth4U diseña y ejecuta el GTM (no solo la estrategia en papel)""",
    },
    {
        'slug': 'agencia-founder-led-growth-fintech',
        'title': 'Agencia para Founder-Led Growth en Fintech: cómo el fundador lidera el crecimiento y cuándo automatizarlo',
        'category': 'Estrategia',
        'keyword': 'agencia founder-led growth fintech',
        'brief': """Pillar page para "agencia founder-led growth fintech".

Puntos clave:
- Qué es el founder-led growth: el fundador como canal de distribución (LinkedIn, podcasts, eventos, comité asesor)
- Por qué funciona especialmente bien en fintech: el trust es escaso, la voz del fundador genera autoridad que ningún anuncio puede comprar
- Las 3 fases: construir audiencia (0-1k), monetizar audiencia (1k-10k), sistematizar y delegar (10k+)
- Cuándo el founder-led growth empieza a ser el cuello de botella: señales y cómo detectarlas
- Cómo automatizar sin perder la voz del fundador: comité asesor, ghostwriting, sistemas de extracción de contenido
- El error más común: el fundador que escala mal y acaba siendo el único que sabe hacer todo
- Casos: cómo estructurar un comité asesor B2B para generar contenido de autoridad sin escribir tú mismo
- Por qué Growth4U ayuda a sistematizar el founder-led growth antes de que frene el crecimiento""",
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


def create_slug(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'[^\w-]+', '', text)
    return re.sub(r'--+', '-', text)


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
    print('Growth4U — Crear 6 Pillar Pages (Cluster Agencia)')
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
    print('  git commit -m "feat: 6 pillar pages cluster agencia (SEO fase 2)"')
    print('  git push origin main')


if __name__ == '__main__':
    main()
