'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveLeadMagnetLead } from '@/lib/firebase';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Unlock,
  CheckCircle,
  Loader2,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  FileText,
  ChevronRight,
  Package,
  Clock,
  TrendingUp,
} from 'lucide-react';

const STORAGE_KEY = 'lm_dashboard_attribution_unlocked';

const RESOURCES = [
  { num: '01', icon: <FileSpreadsheet className="w-5 h-5" />, color: 'emerald', title: 'Google Sheet: Dashboard de Attribution', subtitle: '6 tabs — plantilla lista para copiar' },
  { num: '02', icon: <FileText className="w-5 h-5" />, color: 'blue', title: 'Guía: Attribution Real en 7 Días', subtitle: 'PDF 4 páginas — sin Segment, sin data scientist' },
  { num: '03', icon: <BarChart3 className="w-5 h-5" />, color: 'violet', title: 'Las 8 Métricas que Importan', subtitle: 'PDF checklist — vanity metrics vs métricas de decisión' },
  { num: '04', icon: <TrendingUp className="w-5 h-5" />, color: 'amber', title: 'Mini Caso Criptan', subtitle: 'PDF 2 páginas — de "no podemos probarlo" a +160% depósitos' },
];

export default function DashboardAttributionPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [analytics, setAnalytics] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!analytics) { setError('Por favor selecciona cómo mides actualmente.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await saveLeadMagnetLead({
        name, email,
        company: phone,
        leadMagnet: `dashboard-attribution|phone:${phone}|analytics:${analytics}`,
      });
      localStorage.setItem(STORAGE_KEY, '1');
      setUnlocked(true);
      setTimeout(() => {
        document.getElementById('content-unlocked')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch {
      setError('Hubo un error. Por favor inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-5 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-[#6351d5] flex items-center gap-1.5 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>
      </nav>

      <div className="pt-16">
        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#032149] via-[#0d2d5e] to-[#1a1060] text-white py-20 px-4">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #45b6f7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6351d5 0%, transparent 50%)' }} />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Package className="w-3.5 h-3.5" /> Kit Gratuito · Dashboard + Guía + Casos
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Saber qué funciona<br />
              <span className="text-[#45b6f7]">y dejar de adivinar.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              "Creemos que los influencers funcionan, pero no podemos probarlo." Sin attribution, sin dashboards, sin ritual de optimización.
              <strong className="text-white"> Si no puedes atribuir, no puedes escalar. Punto.</strong>
            </p>
          </div>
        </section>

        {/* ── PROOF ──────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-900 font-semibold text-sm leading-relaxed italic">
              "Gastaban dinero en 6 canales. Sin saber cuál convertía. Montamos attribution real en 7 días, sin Segment, sin data scientist. El resultado: por fin supieron qué funcionaba — y por qué."
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#032149] mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6351d5]" />
            Lo que pasa cuando sabes qué funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-gradient-to-br from-[#0faec1]/5 to-[#0faec1]/10 border border-[#0faec1]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">CRP</span>
                </div>
                <span className="font-bold text-[#032149]">Criptan</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">"Creemos que los influencers funcionan pero no podemos probarlo." 6 canales activos. Cero attribution real.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">+160%</span>
                  <span className="text-sm text-slate-600">depósitos tras attribution real</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">7 días</span>
                  <span className="text-sm text-slate-600">para montar attribution</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#6351d5]/5 to-[#6351d5]/10 border border-[#6351d5]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">B2M</span>
                </div>
                <span className="font-bold text-[#032149]">Bit2Me</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Attribution permitió descubrir que el 70% del gasto en paid no se convertía en usuarios activados.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">-70%</span>
                  <span className="text-sm text-slate-600">CAC al redistribuir presupuesto</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">70%</span>
                  <span className="text-sm text-slate-600">del gasto era desperdicio identificable</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
            <strong className="text-[#032149]">La lección:</strong> No necesitábamos gastar más. Necesitábamos saber dónde estábamos gastando bien. El dashboard hace eso en 30 minutos a la semana.
          </div>
        </section>

        {/* Resource preview */}
        <section className="max-w-3xl mx-auto px-4 pb-6">
          <h2 className="text-xl font-bold text-[#032149] mb-2 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#6351d5]" />
            El Dashboard de Verdad — 4 recursos
          </h2>
          <p className="text-slate-500 text-sm mb-6">Todo lo que necesitas para medir lo que importa</p>
          <div className="space-y-3 mb-10">
            {RESOURCES.map(({ num, icon, color, title, subtitle }) => (
              <div key={num} className={`flex items-center gap-4 p-4 bg-${color}-50/60 border border-${color}-100 rounded-xl`}>
                <div className={`w-10 h-10 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>{icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#032149] text-sm">{title}</p>
                  <p className="text-slate-500 text-xs">{subtitle}</p>
                </div>
                <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* ── GATE ───────────────────────────────────────────────────── */}
        {!unlocked && (
          <section className="max-w-3xl mx-auto px-4 pb-16">
            <div className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6351d5]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#45b6f7]" />
                  <span className="text-[#45b6f7] font-bold text-sm uppercase tracking-wide">Acceso gratuito</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-2">Descarga el dashboard completo</h2>
                <p className="text-white/70 mb-8 text-sm leading-relaxed">
                  Google Sheet + Guía 7 días + Checklist 8 métricas + Caso Criptan. Todo gratis.
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Nombre *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Tu nombre"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Teléfono</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+34 600 000 000"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@empresa.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">¿Cómo mides actualmente el rendimiento de tus canales? *</label>
                    <div className="space-y-2">
                      {[
                        { value: 'sin-medicion', label: 'No medimos / solo intuición' },
                        { value: 'google-analytics', label: 'Google Analytics básico' },
                        { value: 'sin-attribution', label: 'Herramientas de analytics pero sin attribution clara' },
                        { value: 'attribution-implementada', label: 'Attribution multi-touch implementada' },
                      ].map(({ value, label }) => (
                        <label key={value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm ${analytics === value ? 'border-[#45b6f7] bg-white/15' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                          <input type="radio" name="analytics" value={value} checked={analytics === value} onChange={() => setAnalytics(value)} className="hidden" />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${analytics === value ? 'border-[#45b6f7]' : 'border-white/40'}`}>
                            {analytics === value && <div className="w-2 h-2 rounded-full bg-[#45b6f7]" />}
                          </div>
                          <span className="text-white/80">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] disabled:bg-slate-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm mt-2">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Desbloqueando...</> : <><Unlock className="w-4 h-4" /> Descargar el dashboard gratuito</>}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Dentro encontrarás:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/60">
                    {['Google Sheet listo para usar (6 tabs)', 'Guía attribution en 7 días', 'Vanity metrics vs métricas de decisión', 'Caso Criptan: +160% depósitos', 'Semáforo automático por canal', 'Ritual semanal de revisión'].map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0faec1] flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── UNLOCKED ───────────────────────────────────────────────── */}
        {unlocked && (
          <div id="content-unlocked" className="max-w-3xl mx-auto px-4 pb-24">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-10 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Unlock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">Dashboard desbloqueado — 4 recursos disponibles</p>
                <p className="text-emerald-700 text-xs">Guarda esta página en favoritos para acceder cuando quieras.</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-[#032149] mb-8">Tus 4 Recursos</h2>

            {/* Resource 01 */}
            <ResourceCard num="01" icon={<FileSpreadsheet className="w-5 h-5" />} color="emerald"
              title="Google Sheet: Dashboard de Attribution por Canal" subtitle="6 tabs — semáforo automático — listo para copiar">
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                La plantilla exacta que usamos para saber qué funciona de verdad. Diseñada para que en 30 minutos a la semana tengas todas las decisiones de presupuesto claras.
              </p>
              <div className="space-y-2 mb-5">
                {[
                  { tab: 'Tab 1: Vista General', desc: 'Todos los canales con CAC, LTV, Payback y ROI. Semáforo automático (verde/amarillo/rojo) que dice qué escalar y qué cortar.' },
                  { tab: 'Tab 2: Attribution por Canal', desc: 'Paid, orgánico, referidos, influencers, PR, SEO/GEO — cada uno con sus métricas desglosadas.' },
                  { tab: 'Tab 3: Embudo Completo', desc: 'Registro → Activación (CAR) → Retención → Revenue → Referido. Ve dónde se rompe el embudo.' },
                  { tab: 'Tab 4: Evolución Semanal', desc: 'Gráficos de tendencia por canal. ¿Tu CAC sube o baja? ¿Tu CAR mejora o empeora?' },
                  { tab: 'Tab 5: Benchmarks', desc: 'Comparativa por industria para saber si tus números son buenos, normales o malos.' },
                  { tab: 'Tab 6: Ritual de Revisión', desc: 'Checklist semanal de qué revisar y qué decisión tomar. 30 minutos cada lunes.' },
                ].map(({ tab, desc }) => (
                  <div key={tab} className="flex items-start gap-3 bg-emerald-50/60 border border-emerald-100 rounded-lg p-3">
                    <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#032149] text-xs">{tab}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-100 rounded-lg p-3 flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 text-xs font-semibold">30 minutos/semana para tener todas las decisiones de presupuesto claras</p>
              </div>
              <div className="mt-4 bg-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-white/70 text-sm">Agenda una llamada y te enviamos el enlace del Sheet antes de que termine.</p>
                <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2.5 px-5 rounded-full transition-all text-xs whitespace-nowrap flex-shrink-0">
                  Agendar llamada <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </ResourceCard>

            {/* Resource 02 */}
            <ResourceCard num="02" icon={<FileText className="w-5 h-5" />} color="blue"
              title="Guía: Attribution Real en 7 Días" subtitle="Sin Segment. Sin data scientist. Sin herramientas caras.">
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                El plan día a día para pasar de "no medimos nada" a "sabemos exactamente qué funciona y por qué" en una semana.
              </p>
              <div className="space-y-4">
                {[
                  {
                    days: 'Día 1-2', title: 'Mapea tus canales', color: 'blue',
                    items: [
                      'Lista todos los canales activos (paid, SEO, referidos, influencers, PR…)',
                      'Clasifica cada uno: awareness / adquisición / activación / retención / referido',
                      'Identifica qué mides hoy vs qué deberías medir (los gaps)',
                    ],
                  },
                  {
                    days: 'Día 3-4', title: 'Instala tracking básico', color: 'violet',
                    items: [
                      'UTM parameters para cada canal (plantilla incluida en el Sheet)',
                      'Define los 5 eventos de conversión clave (no 50 — los 5 que importan)',
                      'Conecta las fuentes a tu dashboard (manual o con agente IA)',
                    ],
                  },
                  {
                    days: 'Día 5-6', title: 'Construye tu dashboard', color: 'amber',
                    items: [
                      'Usa la plantilla Google Sheet — Tab 1 primero',
                      'Llena con datos de las últimas 4 semanas',
                      'Configura los semáforos: ¿qué umbral es rojo / amarillo / verde para ti?',
                    ],
                  },
                  {
                    days: 'Día 7', title: 'Activa el ritual', color: 'emerald',
                    items: [
                      'Bloquea 30 min cada lunes en el calendario (no negociable)',
                      'Decisión semanal: ¿dónde escalo? ¿dónde corto?',
                      'Documenta cada decisión y su resultado — en 4 semanas tendrás patrones',
                    ],
                  },
                ].map(({ days, title, color, items }) => (
                  <div key={days} className={`bg-${color}-50/50 border border-${color}-200 rounded-xl p-4`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`bg-${color}-100 text-${color}-700 text-xs font-bold px-2.5 py-1 rounded-full`}>{days}</span>
                      <span className="font-black text-[#032149] text-sm">{title}</span>
                    </div>
                    <div className="space-y-1.5">
                      {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <div className={`w-3.5 h-3.5 border-2 border-${color}-300 rounded flex-shrink-0 mt-0.5`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResourceCard>

            {/* Resource 03 */}
            <ResourceCard num="03" icon={<BarChart3 className="w-5 h-5" />} color="violet"
              title="Las 8 Métricas que Importan" subtitle="Vanity metrics vs métricas de decisión">
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Las métricas que impresionan vs las que realmente permiten tomar decisiones. El cambio de mentalidad más importante en attribution.
              </p>
              <div className="overflow-x-auto rounded-xl border border-violet-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-violet-50 border-b border-violet-200">
                      <th className="text-left p-3 font-bold text-red-600">Vanity Metric</th>
                      <th className="text-left p-3 font-bold text-emerald-600">Métrica de Decisión</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Por Qué Importa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-50">
                    {[
                      ['Registros', 'CAR (Customer Activation Rate)', 'Los registros no pagan. Los activados sí.'],
                      ['Impresiones', 'CAC por canal', 'No cuántos te ven, sino cuánto cuesta cada cliente real.'],
                      ['Seguidores', 'LTV (Lifetime Value)', 'No cuántos entran, sino cuánto valen.'],
                      ['Clicks', 'Payback Period', 'Cuánto tardas en recuperar el coste de adquisición.'],
                      ['"Nos va bien"', 'LTV/CAC Ratio', 'Si es <3x, tu modelo no escala.'],
                      ['Downloads', 'Activation to Revenue', 'De los que activan, ¿cuántos generan ingreso?'],
                      ['NPS', 'Referral Rate', '¿Cuántos traen a otros? Si no, tu producto no enamora.'],
                      ['"El influencer fue bien"', 'Attribution por canal', '¿Puedes probarlo? Si no, no lo sabes.'],
                    ].map(([van, dec, why]) => (
                      <tr key={van} className="hover:bg-violet-50/50">
                        <td className="p-3 text-red-600 font-medium">{van}</td>
                        <td className="p-3 text-emerald-700 font-bold">{dec}</td>
                        <td className="p-3 text-slate-500">{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
                <strong>La regla de oro:</strong> Si una métrica no cambia una decisión, no merece espacio en tu dashboard. Cada métrica debe tener una pregunta asociada: ¿qué haré diferente si este número sube / baja?
              </div>
            </ResourceCard>

            {/* Resource 04 */}
            <ResourceCard num="04" icon={<TrendingUp className="w-5 h-5" />} color="amber"
              title="Mini Caso Criptan" subtitle='De "creemos que funciona" a +160% depósitos'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <p className="text-red-600 font-black text-xs uppercase tracking-wide mb-3">Antes</p>
                  <div className="space-y-2">
                    {[
                      '"Creemos que los influencers funcionan pero no podemos probarlo"',
                      '6 canales activos — sin saber cuál convertía',
                      'Presupuesto distribuido por intuición',
                      'Cero attribution real entre canales',
                      'Imposible justificar inversiones al equipo inversor',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-red-700">
                        <span className="flex-shrink-0 mt-0.5">✕</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                  <p className="text-emerald-600 font-black text-xs uppercase tracking-wide mb-3">Después (7 días)</p>
                  <div className="space-y-2">
                    {[
                      'Attribution implementada por canal (UTMs + dashboard)',
                      'Descubrieron que la confianza (reviews + contenido) era el driver real',
                      'Identificaron 2 influencers que sí convertían (y 3 que no)',
                      'Presupuesto redirigido hacia lo que funcionaba',
                      '+160% depósitos sin aumentar el presupuesto total',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                        <span className="flex-shrink-0 mt-0.5">✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-bold text-[#032149] text-sm">Las 3 acciones que lo cambiaron todo:</h4>
                {[
                  { n: '1', title: 'Implementar tracking por canal', desc: 'UTMs en todos los links. 5 eventos de conversión clave (no 50). Fuentes conectadas al dashboard en menos de 1 día.' },
                  { n: '2', title: 'Dashboard semanal de 30 minutos', desc: 'Cada lunes: ¿qué canal tiene mejor CAR? ¿qué canal tiene peor CAC? Una decisión de presupuesto por semana.' },
                  { n: '3', title: 'Métricas de decisión (no de vanity)', desc: 'De medir "impresiones de influencer" a medir "depósitos generados por influencer". El cambio de métrica cambió el presupuesto.' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex items-start gap-3 bg-amber-50/60 border border-amber-100 rounded-xl p-4">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                    <div>
                      <p className="font-bold text-[#032149] text-sm">{title}</p>
                      <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="bg-slate-50 border-l-4 border-amber-400 pl-5 py-3 pr-4 rounded-r-xl">
                <p className="text-slate-700 italic text-sm">
                  "No necesitábamos gastar más. Necesitábamos saber dónde estábamos gastando bien. El dashboard lo hizo evidente en la primera semana."
                </p>
              </blockquote>
            </ResourceCard>

            {/* Bonus section */}
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-black text-[#032149] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#6351d5]" />
                El Ritual Semanal — Cómo usar el dashboard cada lunes
              </h3>
              <div className="space-y-2 mb-4">
                {[
                  { time: '0-5 min', action: 'Abre Tab 1 (Vista General). ¿Qué semáforos están en rojo?' },
                  { time: '5-15 min', action: 'Revisa Tab 3 (Embudo). ¿Dónde se rompe? ¿CAR bajó? ¿Referidos subieron?' },
                  { time: '15-25 min', action: 'Revisa Tab 2 (Attribution). ¿Qué canal tiene mejor CAR esta semana?' },
                  { time: '25-30 min', action: 'Decisión: ¿dónde subo 20% el presupuesto? ¿dónde lo bajo? Documenta en Tab 6.' },
                ].map(({ time, action }) => (
                  <div key={time} className="flex items-start gap-3 text-sm">
                    <span className="bg-[#6351d5]/10 text-[#6351d5] text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 whitespace-nowrap">{time}</span>
                    <span className="text-slate-600">{action}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-3 bg-white border border-slate-200 rounded-lg p-3">
                <strong className="text-[#032149]">Regla:</strong> Una decisión de presupuesto por semana. No tienes que cambiar todo — solo hacer la decisión más obvia que los datos muestran. En 4 semanas habrás optimizado tu mix de canales sin necesitar un analista.
              </p>
            </div>

            {/* CTA */}
            <section className="mt-16 bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres que implementemos attribution juntos?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Montamos attribution real en 7 días para tu empresa — con tu stack actual, sin Segment, sin data scientists. Agenda una llamada.
              </p>
              <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm">
                Agendar diagnóstico de attribution
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-xs mt-4">30 minutos. Sin compromiso. Solo para empresas con +€1M ARR.</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceCard({ num, icon, color, title, subtitle, children }: {
  num: string; icon: React.ReactNode; color: string; title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className={`border border-${color}-200 rounded-2xl overflow-hidden mb-8`}>
      <div className={`bg-${color}-50 px-6 py-4 flex items-center gap-4 border-b border-${color}-200`}>
        <div className={`w-10 h-10 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>{icon}</div>
        <div>
          <span className={`text-${color}-500 text-xs font-black uppercase tracking-wide`}>Recurso {num}</span>
          <h3 className="font-black text-[#032149] text-base">{title}</h3>
          <p className="text-slate-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
