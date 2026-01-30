// Static case studies data with full content

export interface StaticCaseStudyData {
  company: string;
  stat: string;
  label: string;
  highlight: string;
  summary: string;
  challenge: string;
  solution: string;
  image?: string;
  videoUrl?: string;
  results: string[];
  content: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  mediaUrl?: string;
}

export const caseStudiesData: Record<string, StaticCaseStudyData> = {
  bnext: {
    company: 'BNEXT',
    stat: '500K',
    label: 'Usuarios activos',
    highlight: 'conseguidos en 30 meses',
    summary: 'De 0 a 500.000 usuarios en 30 meses, sin gastar millones en publicidad.',
    challenge: 'Bnext se enfrentaba al desafío más complejo del sector fintech: irrumpir en el mercado bancario español desde cero. Sin licencia bancaria propia, sin presupuesto para competir en guerras de pujas publicitarias, un mercado español desconfiado de las "nuevas apps financieras", y competidores establecidos con décadas de historia.',
    solution: 'En lugar de quemar millones en publicidad, diseñamos un motor de crecimiento centrado en la confianza y la viralidad: el Trust Engine.',
    image: '',
    videoUrl: '',
    results: [
      '0 → 500,000 usuarios en ~2.5 años',
      'CAC blended de €12.5 (optimizado a ~€8)',
      'Inversión total en marketing: ~€5M',
      'Tasa de activación (CAR): 20% → 70% (+50 pp, x3.5)',
      'Retención a 6 meses: 55%'
    ],
    testimonial: 'El marketing tradicional simplemente no funciona igual en fintech. Mientras un e-commerce valida su promesa enviando un paquete, una fintech debe ganarse la confianza del usuario en cada paso.',
    testimonialAuthor: 'Alfonso Sainz',
    testimonialRole: 'Head of Growth, Bnext',
    content: `## El reto de la adquisición masiva desde cero

### Contexto inicial

**Empresa:** Bnext (España)
**Sector:** Neobanca / Fintech B2C
**Período:** 2017 - 2020 (~2.5 años)
**Situación de partida:** Una startup fintech sin licencia bancaria propia, sin marca conocida, compitiendo contra bancos tradicionales con presupuestos de marketing infinitos.

### El problema

Bnext se enfrentaba al desafío más complejo del sector fintech: **irrumpir en el mercado bancario español desde cero**.

Los obstáculos eran enormes:

- Sin licencia bancaria propia (dependían de terceros)
- Sin presupuesto para competir en guerras de pujas publicitarias
- Un mercado español desconfiado de las "nuevas apps financieras"
- Competidores establecidos con décadas de historia

---

## Nuestro enfoque: El Trust Engine

En lugar de quemar millones en publicidad, diseñamos un **motor de crecimiento centrado en la confianza y la viralidad**.

### Fase 1: Descubrimiento del problema ideal

**500 cafés con usuarios potenciales.** No nos sentamos a hacer brainstorming en una sala de reuniones. Salimos a la calle, invitamos a 500 personas a café y escuchamos sus frustraciones reales:

- *"Me sentía estafado cada vez que viajaba al extranjero"*
- *"Era un agobio no saber cuánto pagaría de comisiones"*
- *"Me daba miedo meter mis datos en una app desconocida"*

Este lenguaje emocional se convirtió en la base de toda nuestra comunicación.

### Fase 2: Promesa irresistible y verificable

No dijimos "ahorra comisiones en el extranjero" (genérico).
Dijimos: **"Te devolvemos cada euro de comisión que te cobre un cajero en el extranjero, al instante."**

Una promesa:

- **Específica:** Cada euro, al instante
- **Verificable:** El usuario lo puede comprobar en minutos
- **Emocional:** Elimina la frustración de sentirse "estafado"

### Fase 3: Diseño del momento AHA en <10 minutos

Rediseñamos el onboarding completo para que el usuario experimentara la promesa lo antes posible:

1. Registro simplificado
2. Primer depósito con incentivo
3. Retirada en cajero extranjero
4. **Ver el reembolso entrar en tiempo real**

Ese instante de ver el dinero volver a la cuenta fue el "momento AHA" que transformó curiosos en creyentes.

### Fase 4: Fricción inteligente que cualifica

Contraintuitivamente, **añadimos fricción** al proceso. No queríamos usuarios paracaidistas que se registraran por curiosidad y nunca activaran.

El KYC y el primer depósito actuaban como "peajes de compromiso". El resultado: **multiplicamos la activación real x3.5** (del 20% al 70%).

### Fase 5: Referidos productizados + Trust Fortress

- **Sistema de referidos con doble incentivo:** Quien refería y el referido, ambos ganaban.
- **La tarjeta rosa como símbolo visible:** Un objeto físico que generaba conversaciones.
- **Presencia en medios y comparadores:** Trust Fortress desplegado para que el usuario encontrara evidencia en todas partes.

---

## Resultados medibles

| Métrica | Valor |
| --- | --- |
| **Usuarios activos** | 0 → 500,000 en ~2.5 años |
| **CAC blended** | €12.5 (optimizado a ~€8) |
| **Inversión total en marketing** | ~€5M |
| **Tasa de activación (CAR)** | 20% → 70% (+50 pp, x3.5) |
| **Retención a 6 meses** | 55% |
| **Modelo de atribución** | Multi-touch, last-click ajustado |

---

## Aprendizajes clave

1. **Los atajos rápidos no existen.** Después de 500 cafés construimos el producto. Método, no magia.
2. **Haz cosas que NO escalan.** Los primeros 3,000 usuarios los dimos de alta uno a uno.
3. **La activación es todo.** Pasamos de 20% a 70% CAR diseñando un "momento aha" en <10 minutos.
4. **Los referidos productizados > cualquier canal de pago.** La tarjeta rosa generó un boom de viralidad orgánica.
5. **El PMF se encuentra conversando, no optimizando.** Primero qué resuelves y para quién. Luego amplificas.

### Cobertura mediática

[Noticia en Cinco Días - El País](https://cincodias.elpais.com/cincodias/2020/01/06/companias/1578341441_525921.html)`
  },

  bit2me: {
    company: 'BIT2ME',
    stat: '-70%',
    label: 'Reducción de CAC',
    highlight: 'implementando Trust Engine',
    summary: 'Redujimos el CAC un 70% implementando el Trust Engine.',
    challenge: 'Bit2Me enfrentaba un CAC insostenible, baja tasa de activación, y el mercado cripto en plena crisis de confianza post-FTX. El colapso de FTX había destruido la confianza del mercado.',
    solution: 'Reestructuramos por completo el embudo de activación, la segmentación y toda la arquitectura de Data. El enfoque no fue gastar más, sino hacerlo de forma más inteligente.',
    image: '',
    videoUrl: '',
    results: [
      'Reducción del CAC en un 70%',
      'Tasa de activación duplicada (x2)',
      'LTV (Valor de vida del cliente) duplicado (x2)',
      'TAUs (Transaction Active Users) en crecimiento sostenido',
      'Transformación completada en 12 meses'
    ],
    testimonial: 'El enfoque no fue gastar más, sino hacerlo de forma más inteligente. Reestructuramos por completo el embudo de activación, la segmentación y toda la arquitectura de Data.',
    testimonialAuthor: 'Alfonso Sainz',
    testimonialRole: 'Growth Consultant, Bit2Me',
    content: `## El reto de la rentabilidad en pleno criptoinvierno

### Contexto inicial

**Empresa:** Bit2Me (España)
**Sector:** Exchange de criptomonedas
**Período:** Noviembre 2022 - Octubre 2023 (12 meses)
**Situación de partida:** Un CAC que hacía insostenible el crecimiento, baja tasa de activación, y el mercado cripto en plena crisis de confianza post-FTX.

### El problema

Bit2Me enfrentaba un problema clásico del sector cripto:

- **CAC insostenible:** Cada usuario costaba demasiado adquirir
- **Activación baja:** Muchos registros, pocas primeras transacciones
- **Criptoinvierno:** El colapso de FTX había destruido la confianza del mercado
- **Competencia feroz:** Binance, Coinbase y otros gigantes con presupuestos ilimitados

---

## Nuestro enfoque: Reconstrucción del embudo desde el usuario

### Fase 1: Análisis profundo del funnel existente

Antes de tocar nada, mapeamos cada paso del journey:

- ¿Dónde se perdían los usuarios?
- ¿Qué hacían los que sí activaban diferente?
- ¿Cuál era el verdadero "momento AHA" en cripto?

Descubrimos que la mayoría de registros nunca completaban su primera compra. El problema no era la adquisición, era la **activación**.

### Fase 2: Onboarding enfocado al primer trade

Rediseñamos el onboarding con un objetivo claro: **tu primera compra de Bitcoin en menos de 2 minutos**.

- Simplificamos el KYC sin comprometer compliance
- Eliminamos pasos innecesarios
- Añadimos guías contextuales para novatos
- Creamos un incentivo de activación alineado con la primera compra

### Fase 3: Arquitectura de Data para decisiones en tiempo real

Implementamos un sistema que nos permitía:

- Identificar cohortes de alto valor
- Detectar señales de abandono antes de que ocurrieran
- Personalizar la comunicación según el comportamiento
- Medir TAUs (Transaction Active Users) como North Star Metric

### Fase 4: Trust Fortress para recuperar confianza post-FTX

En un momento donde el mercado cripto estaba destrozado por la desconfianza:

- Amplificamos presencia en medios especializados
- Generamos reviews verificadas en plataformas clave
- Comunicamos transparencia y regulación española
- Creamos alertas de precio que aportaban valor (no spam)

---

## Resultados medibles

| Métrica | Antes | Después | Cambio |
| --- | --- | --- | --- |
| **CAC** | Base | -70% | Reducción del 70% |
| **Tasa de activación** | Base | x2 | Duplicada |
| **LTV (Valor de vida del cliente)** | Base | x2 | Duplicado |
| **TAUs (Transaction Active Users)** | Base | En alza | Crecimiento sostenido |
| **Tiempo de transformación** | - | 12 meses | Nov 2022 - Oct 2023 |

---

## Aprendizajes clave

1. **El CAC baja con confianza, no con más presupuesto.** Reconstruyendo el embudo desde el usuario logramos -70% CAC.
2. **Mide lo que importa: CAR, no registros.** Cuenta cuántos experimentan tu promesa, no cuántos se registran.
3. **La prueba social pública reforzó el ciclo.** Cada review positiva alimentaba la siguiente conversión.
4. **Es posible crecer de forma agresiva y rentable a la vez.** No son conceptos opuestos.
5. **En momentos de crisis sectorial, la confianza es tu mayor diferencial.** Mientras otros se escondían, nosotros amplificamos transparencia.

### Cobertura mediática

- [Podcast Product Hackers - Alfonso Sainz de Baranda](https://producthackers.com/es/podcast/alfonso-sainz-baranda-bit2me/)
- [El Economista - Bit2Me nombrada plataforma cripto más confiable](https://www.eleconomista.es/banca-finanzas/noticias/12546716/11/23/bit2me-nombrada-una-de-las-plataformas-cripto-mas-confiables-por-delante-de-binance-o-coinbase.html)`
  },

  gocardless: {
    company: 'GOCARDLESS',
    stat: '10K €',
    label: 'MRR alcanzado',
    highlight: 'en 6 meses desde lanzamiento',
    summary: 'Lanzamiento desde cero en España y Portugal alcanzando 10k MRR rápidamente.',
    challenge: 'GoCardless necesitaba construir un motor de demanda B2B desde cero en España y Portugal: sin reconocimiento de marca, producto técnico difícil de explicar, competencia de soluciones tradicionales arraigadas, y sin presupuesto para campañas masivas.',
    solution: 'Estrategia enfocada en contenido relevante, alianzas inteligentes con plataformas que ya tenían al cliente, y un proceso de ventas enfocado en ICPs cualificados.',
    image: '',
    videoUrl: '',
    results: [
      'MRR alcanzado: €10,000/mes',
      'Tiempo para conseguirlo: 6 meses',
      'Inversión en ads: Mínima',
      'Mercados lanzados: España + Portugal',
      'Estrategia principal: Contenido + Alianzas + Enfoque ICP'
    ],
    testimonial: 'No teníamos marca, ni clientes, ni presupuesto deslumbrante. El reto era construir un motor de demanda B2B desde cero, en un mercado que aún no entendía bien el producto.',
    testimonialAuthor: 'Alfonso Sainz',
    testimonialRole: 'Growth Lead, GoCardless Iberia',
    content: `## El reto del lanzamiento de mercado B2B desde cero

### Contexto inicial

**Empresa:** GoCardless (UK → España y Portugal)
**Sector:** Fintech B2B / Pagos recurrentes
**Período:** 6 meses
**Situación de partida:** Lanzamiento en dos mercados nuevos sin marca, sin clientes, sin presupuesto deslumbrante, y con un producto que el mercado aún no entendía bien.

### El problema

GoCardless necesitaba construir un **motor de demanda B2B desde cero** en España y Portugal:

- Sin reconocimiento de marca en el mercado ibérico
- Producto técnico (domiciliación bancaria) difícil de explicar
- Competencia de soluciones tradicionales arraigadas
- Sin presupuesto para campañas masivas
- Ciclos de venta B2B largos y complejos

---

## Nuestro enfoque: Foco estratégico sin pirotecnia

### Fase 1: Análisis del mercado y detección de fricción real

Antes de lanzar cualquier campaña, estudiamos:

- ¿Quién tiene el problema de cobros impagados más agudo?
- ¿Qué soluciones usan actualmente y por qué no les funcionan?
- ¿Cuál es la disposición a pagar por resolver esto?

Identificamos los ICPs con mayor dolor y mayor capacidad de decisión rápida.

### Fase 2: Promesa B2B irresistible

No dijimos "sistema de domiciliación bancaria para B2B" (técnico, aburrido).
Dijimos: **"Tus clientes te pagan a tiempo, siempre."**

Una promesa que:

- Habla del resultado, no del proceso
- Conecta con la frustración de perseguir facturas
- Es verificable con datos de cobro

### Fase 3: Estrategia de contenido relevante

Creamos contenido que respondía a las preguntas reales del mercado:

- Comparativas con soluciones tradicionales
- Casos de uso por industria
- Calculadoras de ahorro de tiempo y dinero
- Guías de implementación sin fricciones

### Fase 4: Alianzas inteligentes

En lugar de competir por atención, nos aliamos con:

- Plataformas de facturación que ya tenían el cliente
- Consultorías y asesores fiscales
- Comunidades de CFOs y directores financieros

Ellos ya tenían la confianza. Nosotros aportábamos la solución.

### Fase 5: Proceso de ventas enfocado en ICPs cualificados

- Scoring de leads basado en señales de intención real
- Demos personalizadas por vertical
- Prueba gratuita con acompañamiento
- Onboarding asistido para primeros cobros

---

## Resultados medibles

| Métrica | Valor |
| --- | --- |
| **MRR alcanzado** | €10,000/mes |
| **Tiempo para conseguirlo** | 6 meses |
| **Inversión en ads** | Mínima |
| **Estrategia principal** | Contenido + Alianzas + Enfoque ICP |
| **Mercados lanzados** | España + Portugal |

---

## Aprendizajes clave

1. **Sin trucos. Sin pirotecnia. Solo foco.** El problema correcto y el canal adecuado.
2. **En B2B, la promesa debe hablar de resultados, no de features.** "Tus clientes te pagan a tiempo" > "Sistema de domiciliación".
3. **Las alianzas inteligentes aceleran el time-to-market.** No necesitas construir audiencia si puedes colaborar con quien ya la tiene.
4. **El contenido relevante posiciona y cualifica.** Cada pieza de contenido era un filtro de calidad.
5. **Enfocarse en ICPs con mayor disposición a pagar reduce el ciclo de ventas.** Mejor 10 clientes que pagan bien que 100 que regatean.`
  }
};
