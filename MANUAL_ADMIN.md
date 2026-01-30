# Manual de Gestión Técnica - Web Growth4U

> Última actualización: 27/01/2026
>
> Estado: Live
>
> Stack: Next.js 15 + Firebase + Netlify

---

## 1. Accesos Rápidos

| Plataforma | URL | Notas |
| --- | --- | --- |
| **Web Pública** | `https://growth4u.io` | Dominio de producción |
| **Panel Admin** | `https://growth4u.io/admin/` | Requiere login con `@growth4u.io` |
| **Formulario Feedback** | `https://growth4u.io/feedback/` | URL oculta para enviar a clientes |
| **Blog** | `https://growth4u.io/blog/` | Blog público |
| **Repositorio** | [GitHub](https://github.com/philippe-G4U/growth4u-landing) | Código fuente |
| **Firebase Console** | [Console](https://console.firebase.google.com/project/landing-growth4u) | Base de datos |
| **Netlify** | [Dashboard](https://app.netlify.com/) | Hosting |
| **Trustpilot** | [Perfil](https://www.trustpilot.com/evaluate/growth4u.io) | Reviews públicas |
| **Imgur** | [Álbum](https://imgur.com/a/skeRCDf) | Alojar imágenes para blogs |

---

## 2. Panel de Administración

### Acceso
1. Ir a `https://growth4u.io/admin/`
2. Click en "Continuar con Google"
3. Usar cuenta `@growth4u.io` (otras cuentas serán rechazadas)

### Secciones Disponibles

| Sección | Ruta | Descripción |
| --- | --- | --- |
| **Dashboard** | `/admin/` | Resumen de métricas SEO y GEO |
| **Blog** | `/admin/blog/` | Crear, editar y eliminar posts |
| **Validación Técnica** | `/admin/validation/` | Links a herramientas de validación |
| **Métricas SEO** | `/admin/seo/` | Dashboard con datos de DataForSEO |
| **Tracker GEO** | `/admin/geo/` | Registrar menciones en IA (ChatGPT, Perplexity) |
| **Checklists** | `/admin/checklist/` | Tareas semanales/mensuales de SEO |
| **Feedback** | `/admin/feedback/` | Ver respuestas del formulario de clientes |

---

## 3. Guía: Cómo Subir un Nuevo Blog

### Paso 1: Preparación

Antes de crear el post, ten listo:
1. **Título** (pregunta o afirmación fuerte)
2. **Imagen de portada** (URL directa terminada en .png/.jpg)
   - Correcto: `https://i.imgur.com/foto.png`
   - Incorrecto: `https://imgur.com/foto`
3. **Contenido en Markdown**

### Paso 2: Crear el Post

1. Ir a `/admin/blog/`
2. Click en "Nuevo Artículo"
3. Completar campos:

| Campo | Instrucción | Ejemplo |
| --- | --- | --- |
| **Título** | Pregunta o afirmación fuerte | *¿Ha muerto el SEO? Guía de la Era GEO* |
| **Categoría** | Temática principal | *Estrategia* |
| **Tiempo** | Tiempo de lectura | *5 min* |
| **Imagen** | URL directa (.png/.jpg) | `https://i.imgur.com/...` |
| **Resumen** | 2 líneas respondiendo la duda | *El GEO optimiza contenidos para IA...* |
| **Contenido** | Markdown con estructura GEO | Ver plantilla abajo |

### Paso 3: Formato Markdown

#### Cheatsheet Rápido

| Elemento | Código | Resultado |
| --- | --- | --- |
| Subtítulo | `## Título` | H2 Grande |
| Sub-sección | `### Detalle` | H3 Mediano |
| Negrita | `**Texto**` | **Texto** |
| Lista | `- Item` | - Item |
| Cita | `> "Frase"` | Cita destacada |

#### Plantilla GEO (Copiar y Pegar)

```markdown
## La Respuesta Directa
[Responde la pregunta del título en menos de 50 palabras. Sin introducciones largas.]

## Comparativa: [A] vs [B]

| Variable | Tradicional | Growth4U |
| :--- | :--- | :--- |
| **Enfoque** | Cantidad | Calidad |
| **Tecnología** | Manual | IA & Automatización |
| **Coste** | Alto | Eficiente |

## 3 Claves para [Objetivo]

- **Paso 1:** [Explicación breve].
- **Paso 2:** [Explicación breve].
- **Paso 3:** [Explicación breve].

> "Frase destacada que resume la idea principal para Featured Snippet."

### Conclusión
[Cierre breve con llamada a la acción].
```

---

## 4. Formulario de Feedback para Clientes

### Cómo Funciona

1. Enviar al cliente: `https://growth4u.io/feedback/`
2. El cliente completa las 13 preguntas sobre su experiencia
3. Al enviar:
   - Se guarda en Firebase
   - Se muestra invitación a dejar review en Trustpilot
4. Ver respuestas en `/admin/feedback/`

### Preguntas del Formulario

1. Datos de contacto (empresa, nombre, email)
2. Principal desafío antes de trabajar con nosotros
3. Cómo identificamos el problema
4. Integración con el equipo
5. Soluciones propuestas
6. Ejecución técnica
7. Quiz Flow - aspectos destacados
8. Enfoque iterativo
9. Comparación de conversiones
10. Mejora autónoma
11. Confianza en escalabilidad
12. Recomendación a otros
13. Aspectos que más destacan
14. Comentarios adicionales

---

## 5. Dashboard SEO

### Métricas Disponibles

- **Impresiones** - Veces que aparecemos en búsquedas
- **Clics Orgánicos** - Visitas desde Google
- **CTR** - Click Through Rate
- **Posición Media** - Ranking promedio

### Datos de DataForSEO

El dashboard puede sincronizarse con DataForSEO para obtener:
- Rankings por keyword
- Comparativas con competidores
- Tendencias históricas

---

## 6. Tracker GEO (IA)

### Qué es

Registro de menciones de Growth4U en respuestas de IAs generativas.

### Cómo Usar

1. Ir a `/admin/geo/`
2. Click "Nueva Prueba"
3. Completar:
   - **Plataforma**: ChatGPT, Perplexity, Google SGE, etc.
   - **Prompt**: La pregunta exacta que hiciste
   - **Mencionado**: ¿Growth4U apareció en la respuesta?
   - **Sentimiento**: Positivo, Neutral, Negativo
4. Guardar

### Métricas

- **Tasa de Mención**: % de pruebas donde aparecemos
- **Sentimiento Promedio**: Cómo nos perciben las IAs

---

## 7. Checklists SEO

### Checklist Semanal

- [ ] Revisar Google Search Console
- [ ] Verificar errores de indexación
- [ ] Publicar contenido nuevo
- [ ] Hacer 1 prueba GEO

### Checklist Mensual

- [ ] Auditoría técnica completa
- [ ] Revisar Core Web Vitals
- [ ] Actualizar contenido antiguo
- [ ] Análisis de competidores

---

## 8. Integraciones

### Trustpilot
- **Business Unit ID**: `txZ8DOmwsM3AEPQc`
- SDK instalado globalmente para invitaciones
- Perfil: https://www.trustpilot.com/evaluate/growth4u.io

### Google Analytics 4
- **ID**: `G-4YBYPVQDT6`
- Tracking automático en todas las páginas

### Meta Pixel
- Integrado en el banner de cookies
- Se activa solo con consentimiento

### Calendly
- Links externos para booking de llamadas

---

## 9. Configuración Técnica

### Stack

| Tecnología | Uso |
| --- | --- |
| Next.js 15 | Framework (App Router) |
| TypeScript | Lenguaje |
| Tailwind CSS | Estilos |
| Firebase Firestore | Base de datos |
| Firebase Auth | Autenticación |
| Netlify | Hosting (static export) |
| Cloudinary | Imágenes del blog |

### Colores de Marca

| Color | Hex | Uso |
| --- | --- | --- |
| Primary Purple | `#6351d5` | Botones, CTAs |
| Dark Navy | `#032149` | Textos oscuros |
| Cyan | `#45b6f7` | Acentos |
| Teal | `#0faec1` | Acentos secundarios |
| Background | `#f1f5f9` | Fondo claro |

### Estructura de Carpetas

```
growth4u-landing/
├── next-app/                 # Proyecto Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Home
│   │   │   ├── admin/        # Panel admin (protegido)
│   │   │   ├── blog/         # Blog público
│   │   │   ├── feedback/     # Formulario feedback
│   │   │   ├── privacidad/   # Política privacidad
│   │   │   └── cookies/      # Política cookies
│   │   ├── components/       # Componentes
│   │   └── lib/
│   │       └── firebase.ts   # Config Firebase
│   └── out/                  # Build estático
├── netlify.toml              # Config Netlify
└── MANUAL_ADMIN.md           # Este documento
```

---

## 10. Credenciales (SENSIBLE)

### Firebase Config

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw",
  authDomain: "landing-growth4u.firebaseapp.com",
  projectId: "landing-growth4u",
  storageBucket: "landing-growth4u.firebasestorage.app",
  messagingSenderId: "562728954202",
  appId: "1:562728954202:web:90cff4aa486f38b4b62b63",
  measurementId: "G-4YBYPVQDT6"
};
```

### Colecciones Firestore

| Colección | Contenido |
| --- | --- |
| `artifacts/growth4u-public-app/public/data/blog_posts` | Posts del blog |
| `artifacts/growth4u-public-app/public/data/feedback` | Respuestas feedback |
| `seo_metrics` | Métricas SEO históricas |
| `geo_tests` | Pruebas GEO |
| `checklists` | Checklists completados |

### Accesos

| Servicio | Cuenta |
| --- | --- |
| Firebase | (cuenta Google del proyecto) |
| GitHub | philippe-G4U |
| Netlify | (cuenta asociada) |

---

## 11. Despliegue

### Automático

Cada push a `main` en GitHub dispara un build en Netlify automáticamente.

### Manual

```bash
cd next-app
npm run build
# El output está en next-app/out/
```

### Configuración Netlify

- **Base directory**: `next-app`
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Production branch**: `main`

---

## 12. Solución de Problemas

### El admin no carga
- Verificar que usas cuenta `@growth4u.io`
- Verificar que Google Auth está habilitado en Firebase

### Los posts no aparecen
- Verificar conexión a Firebase en consola del navegador
- Revisar colección `blog_posts` en Firestore

### Error al subir imagen
- Usar URL directa (termina en .png/.jpg)
- Verificar que Cloudinary está configurado (para admin)

### El feedback no se guarda
- Verificar reglas de Firestore permiten escritura
- Revisar consola del navegador por errores

---

## 13. Contacto Técnico

Para problemas técnicos o actualizaciones del código, crear un issue en:
https://github.com/philippe-G4U/growth4u-landing/issues
