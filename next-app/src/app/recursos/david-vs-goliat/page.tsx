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
  Calendar,
  ChevronRight,
  Crosshair,
  Zap,
  Shield,
  TrendingUp,
  Eye,
} from 'lucide-react';

const STORAGE_KEY = 'lm_david_vs_goliat_unlocked';

export default function DavidVsGoliatPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await saveLeadMagnetLead({ name, email, company, leadMagnet: 'david-vs-goliat' });
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
              <BookOpen className="w-3.5 h-3.5" /> Framework Gratuito · Ventaja Asimétrica
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Compites contra alguien con<br />
              <span className="text-[#45b6f7]">10x tu presupuesto.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Ellos gastan millones en ads. Tienen equipos de 50 personas. Aparecen en todas partes.
              Y tú sientes que la pelea está perdida antes de empezar.
              <strong className="text-white"> Pero la creencia de que "el que más gasta, gana" es falsa.</strong>
            </p>
          </div>
        </section>

        {/* ── PROOF ──────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
            <p className="text-slate-700 leading-relaxed mb-3">
              Lo que determina quién gana es quién entiende mejor al mercado y ejecuta un sistema más eficiente.
              El presupuesto solo amplifica lo que ya funciona —
              <strong className="text-[#032149]"> y si lo que tienes no funciona, más presupuesto solo amplifica el desperdicio.</strong>
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#032149] mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6351d5]" />
            Lo que pasa cuando compites con sistema en vez de con presupuesto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-gradient-to-br from-[#6351d5]/5 to-[#6351d5]/10 border border-[#6351d5]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">BNX</span>
                </div>
                <span className="font-bold text-[#032149]">Bnext vs N26</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">N26 entró con €50/cliente. Bnext tenía una fracción de ese presupuesto.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">€12,50</span>
                  <span className="text-sm text-slate-600">CAC vs €50 de N26 (4x más eficiente)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">17m</span>
                  <span className="text-sm text-slate-600">para 300K usuarios — N26 tardó 58</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0faec1]/5 to-[#0faec1]/10 border border-[#0faec1]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">CRP</span>
                </div>
                <span className="font-bold text-[#032149]">Criptan vs Binance</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Exchange español pequeño vs el exchange más grande del mundo.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">+160%</span>
                  <span className="text-sm text-slate-600">en depósitos sin cambiar el producto</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">70→300+</span>
                  <span className="text-sm text-slate-600">reviews verificadas con nota 4+</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 leading-relaxed">
            <strong>No ganó el que más gastó. Ganó el que mejor entendió dónde pelear.</strong> En esta guía tienes el framework "Place to Win", los casos completos y el plan para encontrar tu ventaja asimétrica en 30 días.
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
                  <span className="text-[#45b6f7] font-bold text-sm uppercase tracking-wide">Contenido exclusivo</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-2">Accede al framework completo</h2>
                <p className="text-white/70 mb-8 text-sm leading-relaxed">
                  Desbloquea el framework Place to Win, las 5 ventajas asimétricas, los ejercicios guiados y el plan de 30 días.
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
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Empresa *</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} required placeholder="Tu empresa"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="tu@empresa.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] disabled:bg-slate-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Desbloqueando...</> : <><Unlock className="w-4 h-4" /> Acceder al framework gratuito</>}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Dentro encontrarás:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/60">
                    {['5 ventajas asimétricas de los pequeños', 'Framework Place to Win (3 círculos)', 'Caso: Bnext vs N26 completo', 'Caso: Criptan vs Binance', 'Ejercicio guiado para encontrar tu nicho', 'Plan de acción 30 días'].map(item => (
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
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-12 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Unlock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">Framework desbloqueado</p>
                <p className="text-emerald-700 text-xs">Tienes acceso completo. Guarda esta página en favoritos.</p>
              </div>
            </div>

            {/* PARTE 1 */}
            <section className="mb-16">
              <SectionHeader num="1" title="Por Qué el Presupuesto No Determina Quién Gana" />
              <p className="text-slate-600 leading-relaxed mb-6">
                La creencia más extendida en growth es que el que más gasta, gana. Parece lógico.
                <strong className="text-[#032149]"> Es falso.</strong> Lo que determina quién gana es quién entiende mejor al mercado y ejecuta un sistema más eficiente.
              </p>

              <h3 className="font-bold text-[#032149] mb-4 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#6351d5]" />
                Las 5 Ventajas Asimétricas que Tienen los Pequeños
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Zap className="w-4 h-4" />, color: 'amber', title: 'Velocidad', desc: 'Ellos necesitan 3 meses para aprobar una campaña. Tú puedes iterar en 3 días. Cuando N26 preparaba su próximo lanzamiento trimestral, Bnext ya había probado y descartado 5 ideas.' },
                  { icon: <Eye className="w-4 h-4" />, color: 'blue', title: 'Cercanía', desc: 'Ellos tienen un departamento de "Experiencia de Cliente" de 50 personas que no hablan con clientes. Tú puedes enviar un WhatsApp a tus primeros 100 usuarios y preguntar directamente.' },
                  { icon: <Crosshair className="w-4 h-4" />, color: 'violet', title: 'Nicho', desc: 'Ellos tienen que servir a todo el mundo. Tú puedes resolver un problema específico brillantemente. Los grandes son "buenos para todos". Tú puedes ser "perfecto para alguien".' },
                  { icon: <Shield className="w-4 h-4" />, color: 'teal', title: 'Autenticidad', desc: 'Ellos tienen compliance, legal, comunicación corporativa. Tú puedes ser transparente, admitir errores en público, publicar datos reales. La autenticidad genera una confianza que ningún presupuesto puede comprar.' },
                  { icon: <TrendingUp className="w-4 h-4" />, color: 'emerald', title: 'Eficiencia', desc: 'Ellos gastan €50 por cliente porque pueden. Tú necesitas gastar €12,50 porque no puedes desperdiciar. Esa restricción te obliga a construir un sistema más eficiente — y eso se convierte en tu ventaja permanente.' },
                ].map(({ icon, color, title, desc }) => (
                  <div key={title} className={`flex items-start gap-4 p-4 bg-${color}-50/60 border border-${color}-100 rounded-xl`}>
                    <div className={`w-9 h-9 bg-${color}-100 text-${color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#032149] text-sm mb-1">{title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PARTE 2 */}
            <section className="mb-16">
              <SectionHeader num="2" title='El Framework "Place to Win" — Encuentra la Pelea que Puedes Ganar' />
              <p className="text-slate-600 leading-relaxed mb-6">
                No todas las peleas valen la pena. La clave no es competir contra el gigante en su terreno — es encontrar el terreno donde el gigante pierde.
              </p>

              <h3 className="font-bold text-[#032149] mb-4 text-sm">Los 3 Círculos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    emoji: '🔴', color: 'red', title: 'Dolor Real del Mercado',
                    desc: 'Lo que la gente necesita y no tiene — según waterholes, no según tus suposiciones.',
                    questions: ['¿Qué se quejan los usuarios de tus competidores?', '¿Qué piden que nadie les da?', '¿Qué objeciones repiten una y otra vez?'],
                  },
                  {
                    emoji: '🔵', color: 'blue', title: 'Fallo de la Competencia',
                    desc: 'Donde los grandes dejan gaps: nichos desatendidos, experiencia pobre, pricing injusto.',
                    questions: ['¿En qué son mediocres tus competidores grandes?', '¿Qué segmento ignoran?', '¿Dónde su tamaño es una desventaja?'],
                  },
                  {
                    emoji: '🟢', color: 'emerald', title: 'Tu Fortaleza',
                    desc: 'Lo que haces mejor que nadie HOY — con los recursos que tienes.',
                    questions: ['¿Qué dicen tus mejores clientes de ti?', '¿En qué eres objetivamente mejor?', '¿Qué puedes hacer que un grande no puede?'],
                  },
                ].map(({ emoji, color, title, desc, questions }) => (
                  <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-2xl p-5`}>
                    <p className="text-3xl mb-3">{emoji}</p>
                    <h4 className={`font-black text-${color}-800 text-sm mb-2`}>{title}</h4>
                    <p className={`text-${color}-700 text-xs mb-3 leading-relaxed`}>{desc}</p>
                    <div className="space-y-1">
                      {questions.map((q, i) => (
                        <div key={i} className={`text-${color}-600 text-xs flex items-start gap-1`}>
                          <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" /> {q}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual intersection */}
              <div className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-2xl p-8 text-white text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-bold px-3 py-1.5 rounded-full">Dolor del mercado</span>
                  <span className="text-white/40">+</span>
                  <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold px-3 py-1.5 rounded-full">Fallo competencia</span>
                  <span className="text-white/40">+</span>
                  <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-bold px-3 py-1.5 rounded-full">Tu fortaleza</span>
                </div>
                <div className="text-3xl mb-2">⬇</div>
                <div className="bg-[#6351d5] rounded-xl py-3 px-6 inline-block">
                  <p className="font-black text-lg">PLACE TO WIN</p>
                  <p className="text-white/70 text-xs mt-1">Tu nicho donde el grande no puede alcanzarte</p>
                </div>
              </div>

              <div className="bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-xl p-4 text-sm text-slate-700">
                <strong className="text-[#6351d5]">Cuando encuentras la intersección:</strong> pasas de "competir contra todos" a "dominar tu nicho". Y en tu nicho, el grande con 10x de presupuesto no puede alcanzarte porque ni siquiera está mirando.
              </div>
            </section>

            {/* PARTE 3 */}
            <section className="mb-16">
              <SectionHeader num="3" title="Caso Real — Bnext vs N26" />
              <p className="text-slate-500 text-sm mb-6">De startup local a 4x más eficiente que el gigante alemán</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Dolor', emoji: '🔴', value: 'Españoles querían una alternativa bancaria sin comisiones ocultas. Pero no confiaban en "otro banco más".' },
                  { label: 'Fallo N26', emoji: '🔵', value: 'Copió su playbook alemán sin adaptar. El consumidor español es más conservador, necesita más prueba social.' },
                  { label: 'Fortaleza Bnext', emoji: '🟢', value: 'Conocimiento del mercado español. Velocidad de ejecución. Autenticidad (startup local vs corporación).' },
                ].map(({ label, emoji, value }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="font-bold text-[#032149] text-xs uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-[#032149] mb-4 text-sm">La Estrategia en 4 movimientos</h3>
                <div className="space-y-3">
                  {[
                    { n: '1', title: 'Trust Fortress primero, ads después', desc: 'Mientras N26 gastaba en ads, Bnext construía prueba social: reviews en App Store, presencia en comparativas, contenido transparente sobre su modelo.' },
                    { n: '2', title: 'Micro-influencers > Macro-ads', desc: 'Un blogger de viajes trajo 200 clientes en un fin de semana — más de lo que el paid de N26 conseguía en un mes. La confianza pre-existente de su audiencia era el activo.' },
                    { n: '3', title: 'Activación inmediata', desc: 'Onboarding rediseñado: primera transacción en menos de 5 minutos. Cada nuevo usuario experimentaba valor real antes de poder arrepentirse.' },
                    { n: '4', title: 'Referidos productizados', desc: 'Programa de doble incentivo. Los usuarios activos (los que ya confiaban) traían a más usuarios. El mejor canal con el mejor CAC.' },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                      <div>
                        <p className="font-bold text-[#032149] text-sm">{title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-[#032149]">Métrica</th>
                      <th className="text-left p-3 font-bold text-[#6351d5]">Bnext (David)</th>
                      <th className="text-left p-3 font-bold text-slate-500">N26 (Goliat)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['CAC', '€12,50', '€50'],
                      ['Tiempo a 300K usuarios', '17 meses', '58 meses'],
                      ['Reviews App Store', '4.4 estrellas', '—'],
                      ['Estrategia principal', 'Sistema (Trust + Activación + Referidos)', 'Paid ads masivo'],
                    ].map(([m, bnext, n26]) => (
                      <tr key={m} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#032149] text-xs">{m}</td>
                        <td className="p-3 text-[#6351d5] font-bold text-xs">{bnext}</td>
                        <td className="p-3 text-slate-500 text-xs">{n26}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Bnext fue <strong>4x más eficiente en CAC</strong> y <strong>3.4x más rápido</strong> en llegar a 300K. No porque tuviera más dinero — sino porque tenía mejor sistema.
              </p>
            </section>

            {/* PARTE 4 */}
            <section className="mb-16">
              <SectionHeader num="4" title="Caso Complementario — Criptan vs Binance" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Dolor', emoji: '🔴', value: '"Las cripto son un timo" — desconfianza masiva del mercado español conservador.' },
                  { label: 'Fallo Binance', emoji: '🔵', value: 'Zero esfuerzo en adaptar al mercado español. UX compleja. Cero presencia en medios locales.' },
                  { label: 'Fortaleza Criptan', emoji: '🟢', value: 'Regulación española, transparencia total, enfoque en el usuario no-técnico.' },
                ].map(({ label, emoji, value }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="font-bold text-[#032149] text-xs uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0faec1]/5 border border-[#0faec1]/20 rounded-xl p-5 mb-6 text-sm text-slate-600">
                <p className="font-bold text-[#032149] mb-2">La estrategia: competir en confianza, no en features</p>
                <p>En vez de intentar igualar las features de Binance (imposible), Criptan compitió en confianza para el mercado español: reviews de 70 a 300+, contenido educativo para el usuario no-técnico, pricing transparente vs la complejidad de fees de Binance.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-[#6351d5]">+160%</p>
                  <p className="text-sm text-slate-600 mt-1">en depósitos sin cambiar el producto</p>
                </div>
                <div className="bg-[#0faec1]/5 border border-[#0faec1]/20 rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-[#0faec1]">+200%</p>
                  <p className="text-sm text-slate-600 mt-1">en reviews verificadas — prueba social como arma</p>
                </div>
              </div>
            </section>

            {/* PARTE 5 */}
            <section className="mb-16">
              <SectionHeader num="5" title="Encuentra tu Place to Win — Ejercicio Guiado" />

              <div className="space-y-5">
                {[
                  {
                    step: 'Paso 1', title: 'Mapea el Dolor del Mercado', time: '20 min', color: 'red',
                    desc: 'Visita 3 waterholes de tu sector y anota:',
                    items: [
                      'Las 3 quejas más comunes sobre competidores grandes',
                      'Lo que la gente desea y nadie ofrece',
                      'Las objeciones que aparecen al considerar tu categoría',
                      'El lenguaje exacto que usan (sus palabras, no tu interpretación)',
                    ],
                  },
                  {
                    step: 'Paso 2', title: 'Identifica los Fallos de la Competencia', time: '20 min', color: 'blue',
                    desc: 'Analiza a tus 3 competidores más grandes:',
                    items: [
                      '¿En qué son mediocres? (reviews, UX, soporte, pricing)',
                      '¿Qué nicho ignoran por ser "demasiado pequeño"?',
                      '¿Dónde su tamaño les hace lentos o impersonales?',
                      '¿Qué feedback negativo repiten sus usuarios?',
                    ],
                  },
                  {
                    step: 'Paso 3', title: 'Define tu Fortaleza', time: '20 min', color: 'emerald',
                    desc: 'Sé brutalmente honesto:',
                    items: [
                      '¿Qué dicen tus mejores 5 clientes sobre ti? (pregúntales literalmente)',
                      '¿En qué eres objetivamente mejor que la competencia?',
                      '¿Qué puedes hacer que un grande no puede?',
                      '¿Qué harías si tuvieras que elegir UN solo diferencial?',
                    ],
                  },
                  {
                    step: 'Paso 4', title: 'Encuentra la Intersección', time: '10 min', color: 'violet',
                    desc: 'Busca el patrón:',
                    items: [
                      '¿Hay un dolor del mercado que tus competidores no resuelven y tú sí puedes?',
                      '¿Hay un segmento donde tu fortaleza resuelve exactamente lo que la competencia falla?',
                      'Escríbelo: "Somos la mejor opción para [segmento] que necesita [dolor] porque [fortaleza] y [competencia] no lo resuelve."',
                    ],
                  },
                ].map(({ step, title, time, color, desc, items }) => (
                  <div key={step} className={`bg-${color}-50/50 border border-${color}-200 rounded-2xl p-6`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`bg-${color}-100 text-${color}-700 text-xs font-bold px-2 py-1 rounded-full`}>{step}</span>
                        <h4 className="font-black text-[#032149] text-sm">{title}</h4>
                      </div>
                      <span className="text-slate-400 text-xs">{time}</span>
                    </div>
                    <p className={`text-${color}-700 text-xs mb-3`}>{desc}</p>
                    <div className="space-y-1.5">
                      {items.map((item, i) => (
                        <ChecklistItem key={i} text={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PARTE 6 */}
            <section className="mb-16">
              <SectionHeader num="6" title="Plan de Acción — Competir como David en 30 Días" />
              <div className="space-y-4 mt-6">
                {[
                  {
                    week: 'Semana 1', title: 'Diagnóstico Competitivo', color: 'blue',
                    items: [
                      'Completa el ejercicio Place to Win (pasos 1-4 de arriba)',
                      'Lee las 50 reviews más recientes de tus 3 competidores principales',
                      'Googlea las búsquedas que haría tu ICP — ¿dónde apareces? ¿dónde no?',
                      'Pregunta a ChatGPT: "¿Cuáles son las mejores opciones de [tu categoría] en España?"',
                    ],
                  },
                  {
                    week: 'Semana 2', title: 'Trust Fortress en tu Nicho', color: 'violet',
                    items: [
                      'Activa reviews con 10 clientes satisfechos',
                      'Crea 1 pieza de contenido que aborde la objeción #1 de tu mercado',
                      'Asegúrate de estar en las 3 comparativas principales de tu sector',
                      'Verifica Schema Markup y presencia en Bing (para IAs)',
                    ],
                  },
                  {
                    week: 'Semana 3', title: 'Canales Asimétricos', color: 'amber',
                    items: [
                      'Identifica 5 micro-influencers de tu nicho (no masivos — relevantes)',
                      'Contacta a 3 con propuesta de colaboración concreta',
                      'Publica contenido transparente: datos reales, behind the scenes, pricing claro',
                      'Participa en 2 podcasts o newsletters de tu sector',
                    ],
                  },
                  {
                    week: 'Semana 4', title: 'Mide y Ajusta', color: 'emerald',
                    items: [
                      'Revisa métricas: ¿cuál es tu CAC por canal?',
                      '¿Qué canales "asimétricos" tienen mejor CAR?',
                      'Documenta: ¿dónde tienes ventaja clara? ¿dónde no?',
                      'Duplica lo que funciona. Corta lo que no.',
                    ],
                  },
                ].map(({ week, title, color, items }) => (
                  <div key={week} className={`bg-${color}-50 border border-${color}-200 rounded-2xl p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className={`w-5 h-5 text-${color}-600`} />
                      <div>
                        <span className={`text-${color}-500 text-xs font-bold uppercase tracking-wide`}>{week}</span>
                        <h3 className="font-black text-[#032149]">{title}</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className={`w-4 h-4 border-2 border-${color}-400 rounded flex-shrink-0 mt-0.5`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PARTE 7 */}
            <section className="mb-16">
              <SectionHeader num="7" title="Las 5 Reglas de David vs Goliat" />
              <div className="space-y-3 mt-6">
                {[
                  { num: '1', rule: 'No compitas donde el grande es fuerte. Compite donde es débil.', desc: 'Si intentas superar a Goliat en su terreno, pierdes. Si lo llevas a tu terreno (nicho, velocidad, autenticidad), pierde él.' },
                  { num: '2', rule: 'Tu restricción de presupuesto es una ventaja disfrazada.', desc: 'Te obliga a ser creativo, eficiente y selectivo. El grande puede permitirse desperdiciar. Tú no — y eso te hace construir un sistema mejor.' },
                  { num: '3', rule: 'Confianza > Alcance.', desc: 'Un micro-influencer con 5K seguidores que confían en él genera más conversiones que un macro-influencer con 500K que lo ignoran. Busca confianza, no impresiones.' },
                  { num: '4', rule: 'Velocidad mata tamaño.', desc: 'Mientras el grande prepara su próximo trimestre, tú ya probaste 5 ideas, descartaste 3 y escalaste 2. Tu ciclo de iteración es tu arma más potente.' },
                  { num: '5', rule: 'Domina tu nicho antes de expandir.', desc: 'Sé perfecto para un segmento pequeño. Cuando lo domines, expande. Es más fácil crecer desde una posición de dominio que desde una de mediocridad generalizada.' },
                ].map(({ num, rule, desc }) => (
                  <div key={num} className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#6351d5]/5 to-transparent border border-[#6351d5]/10 rounded-xl">
                    <span className="w-8 h-8 bg-[#6351d5] rounded-lg text-white text-sm font-black flex items-center justify-center flex-shrink-0">{num}</span>
                    <div>
                      <span className="font-bold text-[#032149] text-sm">{rule}</span>
                      <span className="text-slate-600 text-sm ml-1">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="mt-8 bg-slate-50 border-l-4 border-[#6351d5] pl-6 py-4 pr-4 rounded-r-xl">
                <p className="text-slate-700 italic text-sm leading-relaxed">
                  "El presupuesto compra alcance. Pero el alcance sin confianza es ruido. Y el ruido, por muy alto que sea, no convierte. David no ganó porque tirara más fuerte. Ganó porque apuntó mejor."
                </p>
              </blockquote>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres encontrar tu ventaja asimétrica?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Trabajamos con empresas tech B2B y B2C para identificar su Place to Win y construir el sistema que lo explota. Agenda una llamada.
              </p>
              <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm">
                Agendar llamada gratuita
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

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0">{num}</div>
      <h2 className="text-2xl font-black text-[#032149]">{title}</h2>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-white/60 ${checked ? 'opacity-60' : ''}`}
      onClick={() => setChecked(v => !v)}>
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
        {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-sm leading-relaxed ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{text}</span>
    </div>
  );
}
