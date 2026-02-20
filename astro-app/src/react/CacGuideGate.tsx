import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { saveLeadMagnetLead } from '../lib/firebase-client';

const MAGNET_SLUG = 'cac-sostenible';
const MAGNET_TITLE = 'Reduce tu CAC un 70%: El Framework de 5 Bloques';
const STORAGE_KEY = `lead_magnet_unlocked_${MAGNET_SLUG}`;

// ─── CONTENIDO GRATUITO ───────────────────────────────────────────────────────

const FREE_CONTENT = `
## Tu CAC sube cada trimestre. Y la respuesta siempre es "gasta más."

Cada quarter es la misma historia. Paid sube los costes un 15-20% interanual. Los canales se saturan. El equipo pide más presupuesto. Y tú sigues inyectando dinero en un embudo que **pierde por todos lados.**

Sabes que no es sostenible. Pero no ves otra salida. Porque nadie te ha enseñado que el problema no es cuánto gastas — es **cómo está montado tu sistema.**

Si más del 60% de tu revenue viene de paid, si no sabes tu CAC real por canal, si tu ratio LTV/CAC es <3x… no tienes un problema de presupuesto. **Tienes un problema de arquitectura.**

---

## 📈 Lo que pasa cuando arreglas la arquitectura

**Bit2Me** invertía 250K€/mes en paid. CAC subiendo cada trimestre. Después de implementar este sistema:

- **CAC: -70%** sin reducir volumen de adquisición
- **LTV: x2** — mejores clientes, no solo más clientes
- Los canales dejaron de competir entre sí y empezaron a **retroalimentarse**

**Bnext** aplicó el mismo framework: **€12,50 de CAC** cuando N26 gastaba €50 por cliente. Llegó a 300K usuarios en 17 meses — N26 tardó 58.

*No gastaron más. Construyeron un sistema donde cada euro invertido reduce el coste del siguiente.*

**En esta guía tienes el framework exacto, la checklist de auditoría y el plan de 30 días para replicarlo.**
`;

// ─── CONTENIDO BLOQUEADO ──────────────────────────────────────────────────────

const LOCKED_CONTENT = `
## 🏛️ Parte 1: El Diagnóstico — ¿Por qué tu CAC es Insostenible?

La mayoría de empresas en crecimiento cometen el mismo error: **escalar gasto antes de tener sistema.** Suben presupuesto de ads, contratan más SDRs, prueban nuevos canales… y el CAC sigue subiendo.

Esto ocurre por 3 razones estructurales:

### 1. Dependencia de un solo canal de adquisición

Si más del 60% de tu revenue viene de paid, estás en riesgo. Los costes de ads suben cada año (~15-20% interanual en Meta/Google). Sin diversificación, tu CAC es rehén de la subasta.

### 2. Zero attribution real

"Creemos que funciona" no es una métrica. Sin saber qué canal convierte (no solo genera clics, sino clientes que pagan y se quedan), estás optimizando a ciegas.

### 3. Falta de Trust Fortress

Antes de hacer clic en "comprar", tu cliente potencial te investiga. ¿Qué encuentra? Si la respuesta es "pocas reviews, nada en comparativas, cero menciones en medios"… tu paid está llenando un embudo con agujeros.

---

## 📊 Parte 2: El Framework de 5 Bloques para Reducir CAC

Este es el sistema que ha demostrado reducir CAC entre un 40% y un 70% en empresas de distintos sectores. No es magia — es ingeniería de confianza.

| Bloque | Qué resuelve | Impacto en CAC | Prioridad |
| --- | --- | --- | --- |
| **1. Trust Fortress** | Controlar lo que encuentran cuando te investigan | Directo — mejora conversión en todo el embudo | 🔴 Crítica |
| **2. Waterholes** | Diagnosticar qué dice el mercado realmente de ti | Indirecto — base para decisiones | 🔴 Semana 1 |
| **3. Activación** | Diseñar el "momento aha" en <10 minutos | Directo — multiplica usuarios que pagan | 🟠 Semana 2-3 |
| **4. Referidos productizados** | Convertir usuarios en canal de adquisición | Directo — canal con CAC ~€0 | 🟠 Semana 3-4 |
| **5. Attribution real** | Medir lo que importa: CAR, no registros | Indirecto — elimina gasto desperdiciado | 🟡 Continuo |

### Bloque 1: Trust Fortress — La Base de Todo

**¿Qué es?** Un sistema para controlar la narrativa que tu mercado encuentra cuando te investiga. Incluye 4 superficies:

1. **Reviews y Prueba Social verificada** — Objetivo: >50 reviews con nota >4.0 en plataformas relevantes. La review más reciente debe tener <30 días. Responde SIEMPRE a reviews negativas.
2. **SEO/GEO (lo que aparece al buscarte)** — ¿Controlas la primera página de Google con tu marca? ¿Apareces en comparativas del sector? ¿ChatGPT/Perplexity te mencionan cuando preguntan por tu categoría?
3. **PR/Editorial** — Menciones en medios que validan tu existencia. No hace falta El País — blogs del sector, podcasts, newsletters cuentan.
4. **Contenido Transparente** — Mostrar el producto sin filtros. Casos de éxito con datos reales (no "incrementamos resultados significativamente").

**Regla clave:** *El CAC baja cuando la confianza sube. No al revés.* Si tu embudo convierte mal, meter más leads arriba no es la solución — arreglar lo que encuentran al investigarte sí lo es.

### Bloque 2: Waterholes — Escuchar Antes de Actuar

**¿Qué son?** Los lugares donde tu mercado habla sin filtros: Reddit, foros especializados, comparativas, comentarios de YouTube, secciones de Q&A.

**Proceso:**

1. Identifica 5-10 waterholes de tu sector
2. Busca: ¿qué preguntan? ¿qué objetan? ¿qué comparan?
3. Documenta los 3 miedos principales y las 3 alternativas que consideran
4. Usa eso para construir tu messaging, tu Trust Fortress y tu onboarding

**Herramientas:** Reddit Search, Answer The Public, Google Trends, Trustpilot/G2 (reviews de competencia), comentarios de YouTube en vídeos del sector.

### Bloque 3: Activación — El Momento que Define tu CAC

**Principio:** Un usuario que no se activa es un usuario que no paga. Y un usuario que no paga sube tu CAC real.

**Métricas clave:**

- **CAR (Customer Activation Rate):** % de registros que experimentan el valor prometido
- **Time to Value:** Tiempo hasta el "momento aha"
- Objetivo: <10 minutos para que el usuario sienta el valor

**Cómo diseñar la activación:**

1. Define tu "momento aha" (¿cuándo el usuario dice "esto funciona"?)
2. Elimina TODOS los pasos que no lleven a ese momento
3. Mide CAR, no registros — los registros mienten
4. Itera semanalmente: ¿puedes recortar 1 paso más?

### Bloque 4: Referidos Productizados — El Canal con CAC ~€0

**Diferencia clave:** Referidos orgánicos = esperanza. Referidos productizados = sistema.

**Cómo productizar referidos:**

1. **Diseña el incentivo correcto** — No siempre es dinero. A veces es acceso anticipado, features premium, reconocimiento.
2. **Hazlo parte del flujo** — No un banner lateral. Integrado en el momento de máxima satisfacción.
3. **Doble incentivo** — Tanto para quien refiere como para quien es referido.
4. **Mide y optimiza** — ¿Cuál es tu K-factor? (referidos por usuario activo)

### Bloque 5: Attribution Real — Deja de Adivinar

**El problema:** La mayoría usa last-click attribution. Eso sobrevalora paid e infravalora todo lo demás (contenido, reviews, referidos, PR).

**Lo mínimo que necesitas:**

- **CAC por canal** (no blended — desglosado)
- **LTV por canal** (¿qué canal trae mejores clientes, no solo más?)
- **Payback period** — ¿Cuánto tardas en recuperar lo invertido?
- **LTV/CAC ratio** — Si es <3x, tu modelo no escala

---

## 🛠️ Parte 3: Checklist de Auditoría — ¿Dónde Pierdes Dinero?

Marca cada punto. Si marcas menos de 8, tienes fugas significativas de CAC.

- [ ] Sabes tu CAC real por canal (no el blended)
- [ ] Tu ratio LTV/CAC es >3x
- [ ] Tu payback period es <6 meses
- [ ] Tienes >50 reviews verificadas con nota >4.0
- [ ] Controlas lo que aparece al buscar tu marca en Google
- [ ] Tu onboarding entrega valor en <10 minutos
- [ ] Tu CAR (activation rate) supera el 40%
- [ ] Tienes un programa de referidos productizado (no solo orgánico)
- [ ] No dependes >60% de un solo canal
- [ ] Mides attribution por canal, no solo last-click
- [ ] Tienes contenido que responde a las objeciones principales
- [ ] Tu equipo revisa métricas de canales semanalmente
- [ ] Sabes qué dicen de ti en los waterholes (Reddit, foros, comparativas)
- [ ] Tu landing tiene prueba social verificable (no solo logos)
- [ ] Tus campañas de retargeting tienen copy diferenciado por etapa

**Scoring:**

- **12-15:** Tu sistema está sólido. Optimiza los detalles.
- **8-11:** Tienes fugas. Prioriza Trust Fortress y Attribution.
- **4-7:** Tu CAC va a seguir subiendo. Necesitas sistema, no más presupuesto.
- **0-3:** Estás quemando dinero. Para, diagnostica, y construye antes de escalar.

---

## 📅 Parte 4: Plan de Acción — 30 Días para Reducir tu CAC

### Semana 1: Diagnóstico

- [ ] Calcula tu CAC real por canal (no el blended)
- [ ] Haz la auditoría de waterholes: ¿qué dice el mercado de ti?
- [ ] Revisa tus reviews: ¿cuántas? ¿qué nota? ¿cuándo fue la última?
- [ ] Busca tu marca en Google: ¿qué encuentra un prospecto?

### Semana 2: Trust Fortress

- [ ] Activa un plan de reviews (pide a los 10 clientes más satisfechos)
- [ ] Crea o actualiza tu presencia en comparativas del sector
- [ ] Responde a todas las reviews negativas pendientes
- [ ] Publica 1 caso de éxito con datos reales

### Semana 3: Activación

- [ ] Define tu "momento aha" exacto
- [ ] Mide tu CAR actual
- [ ] Elimina 2 pasos del onboarding que no aporten valor directo
- [ ] Implementa un follow-up automático a las 24h para usuarios no activados

### Semana 4: Referidos + Attribution

- [ ] Diseña un programa simple de referidos con doble incentivo
- [ ] Intégralo en el flujo post-activación (no en el sidebar)
- [ ] Monta un dashboard básico de CAC, LTV y Payback por canal
- [ ] Instala tu primer ritual semanal de revisión (30 min cada lunes)

---

## 📈 Parte 5: Métricas de Referencia — ¿Cómo Sabes si Funciona?

| Métrica | 🔴 Peligro | 🟡 Aceptable | 🟢 Objetivo |
| --- | --- | --- | --- |
| **CAC blended** | Sube cada trimestre | Estable | Baja trimestre a trimestre |
| **LTV/CAC ratio** | <2x | 2-3x | >3x |
| **Payback period** | >12 meses | 6-12 meses | <6 meses |
| **CAR (activation rate)** | <20% | 20-40% | >40% |
| **Dependencia canal principal** | >70% | 50-70% | <50% |
| **Reviews verificadas** | <20 | 20-50 | >50 con nota >4.0 |
| **Referral rate** | 0% | 5-10% | >15% |

---

## 💡 Resumen: Las 5 Reglas del CAC Sostenible

1. **Confianza antes que tráfico.** Si no controlas lo que encuentran al investigarte, más tráfico = más gente que te descarta.
2. **Activación antes que adquisición.** De nada sirven 10.000 registros si solo el 15% experimenta tu valor.
3. **Sistemas antes que campañas.** Las campañas mueren. Los sistemas componen. Cada euro invertido en sistema reduce el CAC del euro siguiente.
4. **Attribution antes que escala.** Si no sabes qué funciona, escalar solo amplifica el desperdicio.
5. **Referidos como canal, no como esperanza.** Un programa productizado de referidos es el canal más rentable que puedes construir.

> *"El problema nunca es cuánto gastas. Es cuánto de lo que gastas se convierte en confianza, activación y retención. Eso es lo que baja el CAC de verdad."*
`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function CacGuideGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', empresa: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setError('Nombre y email son obligatorios');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await saveLeadMagnetLead({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        tag: formData.empresa.trim(),
        magnetSlug: MAGNET_SLUG,
        magnetTitle: MAGNET_TITLE,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, '1');
      }
      setUnlocked(true);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving lead:', err);
      setError('Hubo un problema. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const freeHtml = marked.parse(FREE_CONTENT, { gfm: true }) as string;
  const lockedHtml = marked.parse(LOCKED_CONTENT, { gfm: true }) as string;

  return (
    <div>
      {/* Free content */}
      <div className="prose prose-lg mx-auto">
        <div dangerouslySetInnerHTML={{ __html: freeHtml }} />
      </div>

      {/* Gate or locked content */}
      {unlocked ? (
        <>
          <div className="my-6 flex items-center gap-2 text-green-600 text-sm font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            ¡Acceso desbloqueado! Aquí tienes el framework completo.
          </div>
          <div className="prose prose-lg mx-auto">
            <div dangerouslySetInnerHTML={{ __html: lockedHtml }} />
          </div>
        </>
      ) : (
        <>
          {/* Blurred preview of locked content */}
          <div className="relative mt-8 overflow-hidden rounded-xl">
            <div
              className="prose prose-lg mx-auto pointer-events-none select-none"
              style={{ filter: 'blur(4px)', opacity: 0.5, maxHeight: '180px', overflow: 'hidden' }}
            >
              <h2>🏛️ Parte 1: El Diagnóstico — ¿Por qué tu CAC es Insostenible?</h2>
              <p>La mayoría de empresas en crecimiento cometen el mismo error: <strong>escalar gasto antes de tener sistema.</strong> Suben presupuesto de ads, contratan más SDRs, prueban nuevos canales… y el CAC sigue subiendo.</p>
              <p>Esto ocurre por 3 razones estructurales:</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />
          </div>

          {/* Gate CTA or form */}
          {!showForm ? (
            <div className="mt-6">
              <div className="bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-[#6351d5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#6351d5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#032149] mb-2">Accede al framework completo</h3>
                <p className="text-slate-500 mb-1">El framework de 5 bloques · Checklist de 15 puntos · Plan de 30 días</p>
                <p className="text-slate-400 text-sm mb-6">Gratis. Sin spam. Acceso inmediato.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#6351d5] hover:bg-[#5242b8] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-[#6351d5]/20"
                >
                  Desbloquear guía →
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg max-w-lg mx-auto">
                <h3 className="text-xl font-bold text-[#032149] mb-1">Déjanos tus datos</h3>
                <p className="text-slate-500 text-sm mb-6">Acceso inmediato al framework completo.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tu nombre *</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="María García"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tu email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maria@tufintech.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tu empresa</label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Nombre de tu fintech"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6351d5] focus:border-transparent"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-2 flex-grow py-3 bg-[#6351d5] hover:bg-[#5242b8] disabled:bg-slate-300 text-white font-bold rounded-xl transition-all"
                    >
                      {submitting ? 'Enviando...' : 'Acceder al framework →'}
                    </button>
                  </div>

                  <p className="text-slate-400 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {/* Bottom CTA after unlocked content */}
      {unlocked && (
        <div className="mt-16 bg-[#032149] rounded-2xl p-8 text-center">
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-3">¿Quieres implementar esto en tu fintech?</p>
          <h3 className="text-2xl font-bold text-white mb-4">Hablamos 30 minutos y te digo dónde está tu mayor fuga de CAC</h3>
          <a
            href="https://calendly.com/growth4u/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#6351d5] hover:bg-[#5242b8] text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-[#6351d5]/30"
          >
            Reservar sesión gratuita →
          </a>
        </div>
      )}
    </div>
  );
}
