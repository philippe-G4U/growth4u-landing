# CLAUDE.md - Growth4U Landing

## Descripción del Proyecto
Landing page de Growth4U, especialistas en Growth Marketing para Fintech B2B y B2C. La web incluye blog, páginas legales, y formulario de feedback para clientes.

## Stack Técnico
- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v3.4
- **Base de datos**: Firebase Firestore (blog posts)
- **Hosting**: Netlify (static export)
- **Idiomas**: ES/EN (sistema de traducciones propio)

## Estructura del Proyecto
```
growth4u-landing/
├── next-app/                 # Proyecto principal Next.js
│   ├── src/
│   │   ├── app/              # Páginas (App Router)
│   │   │   ├── page.tsx      # Home
│   │   │   ├── layout.tsx    # Layout global
│   │   │   ├── blog/         # Blog y posts
│   │   │   ├── feedback/     # Formulario feedback (oculto)
│   │   │   ├── privacidad/   # Política privacidad
│   │   │   └── cookies/      # Política cookies
│   │   ├── components/       # Componentes reutilizables
│   │   └── lib/
│   │       ├── firebase.ts   # Config Firebase
│   │       └── translations.ts # Traducciones ES/EN
│   ├── netlify.toml          # NO USAR - usar el de la raíz
│   └── out/                  # Build output (static)
├── netlify.toml              # Config Netlify (usar este)
├── src/                      # Proyecto Vite antiguo (deprecated)
└── public/                   # Assets estáticos Vite
```

## Comandos Útiles
```bash
# Desarrollo
cd next-app && npm run dev

# Build
cd next-app && npm run build

# El output estático se genera en next-app/out/
```

## Configuración Netlify
- **Base directory**: `next-app`
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Production branch**: `main`

## Colores de Marca
- Primary: `#6351d5` (purple)
- Dark navy: `#032149`
- Cyan: `#45b6f7`
- Teal: `#0faec1`
- Background: `#f1f5f9` (slate-100)

## Integraciones
- **Trustpilot**: SDK instalado globalmente (Business Unit ID: `txZ8DOmwsM3AEPQc`)
- **Meta Pixel**: Integrado en CookieBanner
- **Firebase**: Blog posts en Firestore
- **Calendly**: Links de booking externos

## Variables de Entorno
```
NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL=  # Webhook Make/Zapier para Notion
```

## URLs Importantes
- Producción: https://growth4u.io
- Feedback (oculto): https://growth4u.io/feedback/
- Blog: https://growth4u.io/blog/
- Trustpilot: https://www.trustpilot.com/evaluate/growth4u.io

## Notas
- El proyecto usa `output: 'export'` (static generation)
- Todas las páginas tienen trailing slash (`trailingSlash: true`)
- Los redirects en next.config.ts NO funcionan con static export
- El formulario de feedback es página oculta (no aparece en navegación)
