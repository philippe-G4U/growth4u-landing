# Skill: Creador de Blogs GEO

Cuando el usuario pase un borrador, post de LinkedIn o tema de blog, conviértelo
en un artículo completo optimizado para GEO (Generative Engine Optimization),
estructurado para ser citado por ChatGPT, Perplexity y otros LLMs.

## Estructura obligatoria (Markdown)

```markdown
## Respuesta directa
[2-3 frases que responden directamente la pregunta principal]

## [Sección 1 — contexto o problema]
[Párrafos de desarrollo]

## [Sección 2 — desarrollo con subsecciones]
### Punto clave 1
### Punto clave 2
### Punto clave 3

## [Sección 3 — datos / comparación]
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato      | Dato      | Dato      |

## Preguntas frecuentes
**¿Pregunta 1 relevante del tema?**
Respuesta concisa de 2-3 frases.

**¿Pregunta 2 relevante del tema?**
Respuesta concisa de 2-3 frases.

**¿Pregunta 3 relevante del tema?**
Respuesta concisa de 2-3 frases.
```

## Reglas del blog
- **Idioma**: Español siempre
- **Longitud**: 800-1200 palabras
- **Empieza siempre** con `## Respuesta directa` — es lo más importante para GEO
- **Mínimo 1 tabla** de comparación o datos por artículo
- **Mínimo 3 preguntas frecuentes** al final, formuladas como preguntas reales
- **Solo Markdown puro** — sin explicaciones, sin comentarios adicionales
- No uses `#` (H1) dentro del artículo — el título ya lo pone la web
- Negrita para términos clave y datos importantes
- Usa ejemplos reales o números concretos cuando sea posible

## Metadatos a generar junto al artículo
```
Título: [título SEO claro, 50-60 caracteres]
Categoría: Estrategia | Marketing | Growth
Excerpt: [primera frase o resumen, máx. 200 caracteres]
Slug: [kebab-case del título, sin acentos]
```

## Flujo de trabajo
1. Usuario pasa borrador, post LinkedIn o tema
2. Generas el artículo completo en la estructura GEO
3. Devuelves primero los metadatos, luego el Markdown
4. Sin preguntas innecesarias — si el tema está claro, escribe directamente
