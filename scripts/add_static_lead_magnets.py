#!/usr/bin/env python3
"""
Añade los lead magnets estáticos faltantes a Firebase.
"""
import json
import urllib.request
from datetime import datetime, timezone

FIREBASE_PROJECT_ID = 'landing-growth4u'
FIREBASE_APP_ID     = 'growth4u-public-app'
FIRESTORE_BASE      = f'https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents'
COLLECTION_PATH     = f'artifacts/{FIREBASE_APP_ID}/public/data/lead_magnets'
FIREBASE_API_KEY    = 'AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw'

LEAD_MAGNETS = [
    {
        'slug': 'meseta-de-crecimiento',
        'title': 'Romper la Meseta de Crecimiento',
        'description': 'Por qué tu crecimiento se ha estancado y los 4 palancas para desbloquearlo. Con los casos de Bnext (50K→500K usuarios) y Lydia (4-5x en 18 meses).',
        'excerpt': '## Tu crecimiento se ha estancado. ¿Por qué?\n\nLlevas meses con los mismos números. Los mismos canales. Las mismas tasas de conversión. Estás haciendo todo "bien" — pero el crecimiento no llega.\n\n**Esto es la meseta de crecimiento.** No es mala suerte. Es una señal de que los primeros 2-3 años de crecimiento fácil han terminado y que necesitas un sistema diferente.',
        'contentUrl': '/recursos/meseta-de-crecimiento/',
        'image': '',
    },
    {
        'slug': 'sistema-de-growth',
        'title': 'De Tácticas a Sistema de Growth',
        'description': 'Por qué tus campañas no se acumulan. El framework de 5 bloques que convierte acciones aisladas en un flywheel de crecimiento compuesto.',
        'excerpt': '## El problema con las tácticas aisladas\n\nHaces ads. Publicas contenido. Mandas emails. Organizas webinars. Cada cosa funciona un poco, pero nada se acumula. Cuando paras de pagar, el crecimiento para.\n\n**Esto es lo contrario de un sistema.**',
        'contentUrl': '/recursos/sistema-de-growth/',
        'image': '',
    },
    {
        'slug': 'david-vs-goliat',
        'title': 'David vs Goliat: Compite con 10x Menos Presupuesto',
        'description': 'Cómo ganar cuando tu competidor tiene 10 veces tu presupuesto. El framework Place to Win con los casos de Bnext vs N26 y Criptan vs Binance.',
        'excerpt': '## Tu competidor tiene 10 veces tu presupuesto. ¿Y ahora qué?\n\nN26 gastaba 50€ de CAC en España. Bnext consiguió 12,50€. No porque tuvieran más dinero — sino porque eligieron una batalla diferente.\n\nLa clave no es competir mejor en el mismo terreno. Es encontrar el terreno donde tus ventajas son más grandes que las de ellos.',
        'contentUrl': '/recursos/david-vs-goliat/',
        'image': '',
    },
    {
        'slug': 'kit-de-liberacion',
        'title': 'Kit de Liberación del Fundador',
        'description': '5 recursos para dejar de ser el cuello de botella de tu propio crecimiento. Sistemas, procesos y herramientas para que el equipo ejecute sin ti.',
        'excerpt': '## El fundador como cuello de botella\n\nCada decisión pasa por ti. Cada campaña necesita tu aprobación. Cada brief lo escribes tú. Tu empresa no puede crecer más rápido de lo que tú puedes pensar.\n\n**Esto no es un problema de talento del equipo.** Es un problema de sistemas.',
        'contentUrl': '/recursos/kit-de-liberacion/',
        'image': '',
    },
    {
        'slug': 'dashboard-de-attribution',
        'title': 'Dashboard de Attribution para Fintech',
        'description': 'Para de adivinar qué funciona. El sistema completo de medición para saber exactamente qué canales y qué creatividades generan usuarios rentables.',
        'excerpt': '## No sabes qué funciona. Y eso cuesta dinero.\n\nTienes GA4. Tienes Meta Ads. Tienes el dashboard del banco. Pero cuando te preguntan "¿qué canal nos está trayendo los mejores usuarios?" — no sabes la respuesta.\n\nLa attribution no es un problema técnico. Es un problema de sistema.',
        'contentUrl': '/recursos/dashboard-de-attribution/',
        'image': '',
    },
]

def post_to_firebase(lm):
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    doc = {
        'fields': {
            'title':       {'stringValue': lm['title']},
            'slug':        {'stringValue': lm['slug']},
            'description': {'stringValue': lm['description']},
            'excerpt':     {'stringValue': lm['excerpt']},
            'content':     {'stringValue': ''},
            'contentUrl':  {'stringValue': lm['contentUrl']},
            'image':       {'stringValue': lm['image']},
            'published':   {'booleanValue': True},
            'createdAt':   {'timestampValue': now},
            'updatedAt':   {'timestampValue': now},
        }
    }
    url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}?key={FIREBASE_API_KEY}'
    data = json.dumps(doc).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode())
    return result['name'].split('/')[-1]

def get_existing_slugs():
    url = f'{FIRESTORE_BASE}/{COLLECTION_PATH}?pageSize=50&key={FIREBASE_API_KEY}'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
    return {
        doc.get('fields', {}).get('slug', {}).get('stringValue', '')
        for doc in data.get('documents', [])
    }

def main():
    print('Verificando lead magnets existentes en Firebase...')
    existing = get_existing_slugs()
    print(f'Slugs existentes: {existing}\n')

    for lm in LEAD_MAGNETS:
        if lm['slug'] in existing:
            print(f'⏭️  {lm["slug"]} — ya existe')
            continue
        try:
            doc_id = post_to_firebase(lm)
            print(f'✅ {lm["slug"]} — creado (ID: {doc_id})')
        except Exception as e:
            print(f'❌ {lm["slug"]} — error: {e}')

    print('\nDone.')

if __name__ == '__main__':
    main()
