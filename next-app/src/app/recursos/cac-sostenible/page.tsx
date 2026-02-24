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
  TrendingDown,
  Users,
  BarChart3,
  Shield,
  Zap,
  Target,
  BookOpen,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const STORAGE_KEY = 'lm_cac_sostenible_unlocked';

export default function CacSosteniblePage() {
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
      await saveLeadMagnetLead({ name, email, company, leadMagnet: 'cac-sostenible' });
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
      {/* Navbar */}
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
        {/* ── HERO (always visible) ──────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#032149] via-[#0d2d5e] to-[#1a1060] text-white py-20 px-4">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #45b6f7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6351d5 0%, transparent 50%)' }} />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5" /> Guía Gratuita · Framework CAC Sostenible
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Tu CAC sube cada trimestre.<br />
              <span className="text-[#45b6f7]">Y la respuesta siempre es "gasta más."</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Cada quarter es la misma historia. Paid sube los costes un 15-20% interanual. Los canales se saturan.
              El equipo pide más presupuesto. Y tú sigues inyectando dinero en un embudo que <strong className="text-white">pierde por todos lados.</strong>
            </p>
          </div>
        </section>

        {/* ── PROBLEM + PROOF (always visible) ──────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
            <p className="text-slate-700 leading-relaxed mb-4">
              Sabes que no es sostenible. Pero no ves otra salida. Porque nadie te ha enseñado que el problema
              no es cuánto gastas — es <strong className="text-[#032149]">cómo está montado tu sistema.</strong>
            </p>
            <p className="text-slate-700 leading-relaxed">
              Si más del 60% de tu revenue viene de paid, si no sabes tu CAC real por canal, si tu ratio LTV/CAC es &lt;3x…
              no tienes un problema de presupuesto. <strong className="text-[#032149]">Tienes un problema de arquitectura.</strong>
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#032149] mb-6 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[#6351d5]" />
            Lo que pasa cuando arreglas la arquitectura
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-gradient-to-br from-[#6351d5]/5 to-[#6351d5]/10 border border-[#6351d5]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">B2M</span>
                </div>
                <span className="font-bold text-[#032149]">Bit2Me</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Invertía 250K€/mes en paid. CAC subiendo cada trimestre.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">-70%</span>
                  <span className="text-sm text-slate-600">CAC sin reducir volumen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">x2</span>
                  <span className="text-sm text-slate-600">LTV — mejores clientes</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0faec1]/5 to-[#0faec1]/10 border border-[#0faec1]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">BNX</span>
                </div>
                <span className="font-bold text-[#032149]">Bnext</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Aplicó el mismo framework.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">€12,50</span>
                  <span className="text-sm text-slate-600">CAC vs €50 de N26</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">300K</span>
                  <span className="text-sm text-slate-600">usuarios en 17 meses</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 leading-relaxed">
            <strong>No gastaron más.</strong> Construyeron un sistema donde cada euro invertido reduce el coste del siguiente.
            En esta guía tienes el framework exacto, la checklist de auditoría y el plan de 30 días para replicarlo.
          </div>
        </section>

        {/* ── GATE ──────────────────────────────────────────────────────── */}
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
                  Desbloquea los 5 bloques del sistema, la checklist de auditoría de 15 puntos y el plan de acción de 30 días.
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Nombre *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Tu nombre"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Empresa *</label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        required
                        placeholder="Tu empresa"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="tu@empresa.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#45b6f7] focus:bg-white/15 transition-all text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] disabled:bg-slate-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Desbloqueando...</>
                    ) : (
                      <><Unlock className="w-4 h-4" /> Acceder al framework gratuito</>
                    )}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>

                {/* Preview of locked content */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Dentro encontrarás:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/60">
                    {[
                      'Framework de 5 bloques',
                      'Tabla comparativa por bloque',
                      'Checklist de 15 puntos',
                      'Plan de acción 30 días',
                      'Métricas de referencia',
                      'Reglas del CAC sostenible',
                    ].map(item => (
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

        {/* ── UNLOCKED CONTENT ──────────────────────────────────────────── */}
        {unlocked && (
          <div id="content-unlocked" className="max-w-3xl mx-auto px-4 pb-24">
            {/* Unlock confirmation */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-12 flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Unlock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-sm">Contenido desbloqueado</p>
                <p className="text-emerald-700 text-xs">Tienes acceso completo al framework. Guarda esta página en favoritos.</p>
              </div>
            </div>

            {/* ── PARTE 1: DIAGNÓSTICO ────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">1</div>
                <h2 className="text-2xl font-black text-[#032149]">El Diagnóstico — ¿Por qué tu CAC es Insostenible?</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                La mayoría de empresas en crecimiento cometen el mismo error: <strong>escalar gasto antes de tener sistema.</strong> Suben presupuesto de ads, contratan más SDRs, prueban nuevos canales… y el CAC sigue subiendo.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    color: 'red',
                    title: '1. Dependencia de un solo canal de adquisición',
                    desc: 'Si más del 60% de tu revenue viene de paid, estás en riesgo. Los costes de ads suben cada año (~15-20% interanual en Meta/Google). Sin diversificación, tu CAC es rehén de la subasta.',
                  },
                  {
                    icon: <Target className="w-5 h-5" />,
                    color: 'amber',
                    title: '2. Zero attribution real',
                    desc: '"Creemos que funciona" no es una métrica. Sin saber qué canal convierte (no solo genera clics, sino clientes que pagan y se quedan), estás optimizando a ciegas.',
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    color: 'blue',
                    title: '3. Falta de Trust Fortress',
                    desc: 'Antes de hacer clic en "comprar", tu cliente te investiga. Si encuentran pocas reviews, nada en comparativas, cero menciones en medios… tu paid está llenando un embudo con agujeros.',
                  },
                ].map(({ icon, color, title, desc }) => (
                  <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-5 flex gap-4`}>
                    <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center text-${color}-600 flex-shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#032149] mb-1 text-sm">{title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PARTE 2: FRAMEWORK 5 BLOQUES ─────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">2</div>
                <h2 className="text-2xl font-black text-[#032149]">El Framework de 5 Bloques para Reducir CAC</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Sistema probado que ha reducido CAC entre 40% y 70%</p>

              {/* Overview table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-[#032149]">Bloque</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Qué resuelve</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Impacto</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Prioridad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['1. Trust Fortress', 'Controlar lo que encuentran al investigarte', 'Directo — mejora conversión', 'Crítica'],
                      ['2. Waterholes', 'Diagnosticar qué dice el mercado de ti', 'Indirecto — base decisiones', 'Semana 1'],
                      ['3. Activación', 'Diseñar el "momento aha" en <10 min', 'Directo — multiplica pagos', 'Semana 2-3'],
                      ['4. Referidos', 'Convertir usuarios en canal', 'Directo — CAC ~€0', 'Semana 3-4'],
                      ['5. Attribution', 'Medir CAR, no registros', 'Indirecto — elimina gasto', 'Continuo'],
                    ].map(([bloque, resuelve, impacto, prioridad]) => (
                      <tr key={bloque} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-[#6351d5]">{bloque}</td>
                        <td className="p-3 text-slate-600">{resuelve}</td>
                        <td className="p-3 text-slate-600">{impacto}</td>
                        <td className="p-3 text-slate-500 text-xs">{prioridad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Block 1: Trust Fortress */}
              <BlockCard
                num="1"
                title="Trust Fortress — La Base de Todo"
                icon={<Shield className="w-5 h-5" />}
                color="violet"
              >
                <p className="text-slate-600 text-sm mb-4">
                  Un sistema para controlar la narrativa que tu mercado encuentra cuando te investiga. Incluye 4 superficies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { t: 'Reviews y Prueba Social', d: '>50 reviews con nota >4.0. La más reciente: <30 días. Responde SIEMPRE a reviews negativas.' },
                    { t: 'SEO/GEO', d: '¿Controlas la primera página de Google con tu marca? ¿Apareces en comparativas? ¿ChatGPT te menciona?' },
                    { t: 'PR/Editorial', d: 'Menciones en medios que validan tu existencia. No hace falta El País — blogs del sector, podcasts, newsletters.' },
                    { t: 'Contenido Transparente', d: 'Mostrar el producto sin filtros. Casos de éxito con datos reales, no "incrementamos resultados significativamente".' },
                  ].map(({ t, d }) => (
                    <div key={t} className="bg-violet-50/60 rounded-lg p-3 border border-violet-100">
                      <p className="font-semibold text-[#032149] text-xs mb-1">{t}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-violet-100 rounded-lg p-3 border border-violet-200">
                  <p className="text-violet-800 text-xs font-semibold">
                    Regla clave: El CAC baja cuando la confianza sube. Si tu embudo convierte mal, meter más leads arriba no es la solución — arreglar lo que encuentran al investigarte sí lo es.
                  </p>
                </div>
              </BlockCard>

              {/* Block 2: Waterholes */}
              <BlockCard num="2" title="Waterholes — Escuchar Antes de Actuar" icon={<Users className="w-5 h-5" />} color="blue">
                <p className="text-slate-600 text-sm mb-4">
                  Los lugares donde tu mercado habla sin filtros: Reddit, foros especializados, comparativas, comentarios de YouTube, Q&A.
                </p>
                <div className="space-y-2 text-sm">
                  {[
                    'Identifica 5-10 waterholes de tu sector',
                    'Busca: ¿qué preguntan? ¿qué objetan? ¿qué comparan?',
                    'Documenta los 3 miedos principales y las 3 alternativas que consideran',
                    'Usa eso para construir tu messaging, Trust Fortress y onboarding',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-4">
                  <strong>Herramientas:</strong> Reddit Search, Answer The Public, Google Trends, Trustpilot/G2 (reviews de competencia), comentarios de YouTube.
                </p>
              </BlockCard>

              {/* Block 3: Activación */}
              <BlockCard num="3" title="Activación — El Momento que Define tu CAC" icon={<Zap className="w-5 h-5" />} color="amber">
                <p className="text-slate-600 text-sm mb-4">
                  Un usuario que no se activa es un usuario que no paga. Y un usuario que no paga sube tu CAC real.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'CAR objetivo', value: '>40%' },
                    { label: 'Time to Value', value: '<10 min' },
                    { label: 'Medir', value: 'CAR, no registros' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                      <p className="text-amber-700 font-black text-lg">{value}</p>
                      <p className="text-amber-600 text-xs">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs">
                  Define tu "momento aha", elimina TODOS los pasos que no lleven a ese momento, itera semanalmente.
                </p>
              </BlockCard>

              {/* Block 4: Referidos */}
              <BlockCard num="4" title="Referidos Productizados — El Canal con CAC ~€0" icon={<Users className="w-5 h-5" />} color="green">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-sm text-emerald-800">
                  <strong>Diferencia clave:</strong> Referidos orgánicos = esperanza. Referidos productizados = sistema.
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  {[
                    { title: 'Incentivo correcto', desc: 'No siempre es dinero. Acceso anticipado, features premium, reconocimiento.' },
                    { title: 'Integrado en el flujo', desc: 'No un banner lateral. En el momento de máxima satisfacción.' },
                    { title: 'Doble incentivo', desc: 'Para quien refiere y para quien es referido.' },
                    { title: 'K-factor', desc: '¿Cuántos referidos genera cada usuario activo?' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-[#032149]">{title}:</strong> {desc}</span>
                    </div>
                  ))}
                </div>
              </BlockCard>

              {/* Block 5: Attribution */}
              <BlockCard num="5" title="Attribution Real — Deja de Adivinar" icon={<BarChart3 className="w-5 h-5" />} color="slate">
                <p className="text-slate-600 text-sm mb-4">
                  La mayoría usa last-click attribution. Eso sobrevalora paid e infravalora todo lo demás (contenido, reviews, referidos, PR).
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { metric: 'CAC por canal', desc: 'No blended — desglosado' },
                    { metric: 'LTV por canal', desc: '¿Qué canal trae mejores clientes?' },
                    { metric: 'Payback period', desc: '¿Cuánto tardas en recuperar lo invertido?' },
                    { metric: 'LTV/CAC ratio', desc: 'Si es <3x, tu modelo no escala' },
                  ].map(({ metric, desc }) => (
                    <div key={metric} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <p className="font-bold text-[#032149] text-xs">{metric}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </BlockCard>
            </section>

            {/* ── PARTE 3: CHECKLIST ──────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">3</div>
                <h2 className="text-2xl font-black text-[#032149]">Checklist de Auditoría</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">¿Dónde pierdes dinero? Marca cada punto. Si marcas menos de 8, tienes fugas significativas.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl divide-y divide-slate-200">
                {[
                  'Sabes tu CAC real por canal (no el blended)',
                  'Tu ratio LTV/CAC es >3x',
                  'Tu payback period es <6 meses',
                  'Tienes >50 reviews verificadas con nota >4.0',
                  'Controlas lo que aparece al buscar tu marca en Google',
                  'Tu onboarding entrega valor en <10 minutos',
                  'Tu CAR (activation rate) supera el 40%',
                  'Tienes un programa de referidos productizado',
                  'No dependes >60% de un solo canal',
                  'Mides attribution por canal, no solo last-click',
                  'Tienes contenido que responde a las objeciones principales',
                  'Tu equipo revisa métricas de canales semanalmente',
                  'Sabes qué dicen de ti en los waterholes',
                  'Tu landing tiene prueba social verificable',
                  'Tus campañas de retargeting tienen copy diferenciado por etapa',
                ].map((item, i) => (
                  <ChecklistItem key={i} text={item} num={i + 1} />
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { range: '12-15', label: 'Sistema sólido', color: 'emerald' },
                  { range: '8-11', label: 'Tienes fugas', color: 'amber' },
                  { range: '4-7', label: 'CAC seguirá subiendo', color: 'orange' },
                  { range: '0-3', label: 'Estás quemando dinero', color: 'red' },
                ].map(({ range, label, color }) => (
                  <div key={range} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 text-center`}>
                    <p className={`text-${color}-700 font-black text-xl`}>{range}</p>
                    <p className={`text-${color}-600 text-xs mt-1`}>{label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PARTE 4: PLAN 30 DÍAS ───────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">4</div>
                <h2 className="text-2xl font-black text-[#032149]">Plan de Acción — 30 Días</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Para reducir tu CAC</p>

              <div className="space-y-4">
                {[
                  {
                    week: 'Semana 1',
                    title: 'Diagnóstico',
                    color: 'blue',
                    items: [
                      'Calcula tu CAC real por canal (no el blended)',
                      'Haz la auditoría de waterholes: ¿qué dice el mercado de ti?',
                      'Revisa tus reviews: ¿cuántas? ¿qué nota? ¿cuándo fue la última?',
                      'Busca tu marca en Google: ¿qué encuentra un prospecto?',
                    ],
                  },
                  {
                    week: 'Semana 2',
                    title: 'Trust Fortress',
                    color: 'violet',
                    items: [
                      'Activa un plan de reviews (pide a los 10 clientes más satisfechos)',
                      'Crea o actualiza tu presencia en comparativas del sector',
                      'Responde a todas las reviews negativas pendientes',
                      'Publica 1 caso de éxito con datos reales',
                    ],
                  },
                  {
                    week: 'Semana 3',
                    title: 'Activación',
                    color: 'amber',
                    items: [
                      'Define tu "momento aha" exacto',
                      'Mide tu CAR actual',
                      'Elimina 2 pasos del onboarding que no aporten valor directo',
                      'Implementa un follow-up automático a las 24h para usuarios no activados',
                    ],
                  },
                  {
                    week: 'Semana 4',
                    title: 'Referidos + Attribution',
                    color: 'emerald',
                    items: [
                      'Diseña un programa simple de referidos con doble incentivo',
                      'Intégralo en el flujo post-activación (no en el sidebar)',
                      'Monta un dashboard básico de CAC, LTV y Payback por canal',
                      'Instala tu primer ritual semanal de revisión (30 min cada lunes)',
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

            {/* ── PARTE 5: MÉTRICAS ───────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">5</div>
                <h2 className="text-2xl font-black text-[#032149]">Métricas de Referencia</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">¿Cómo sabes si funciona?</p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-[#032149]">Métrica</th>
                      <th className="text-left p-3 font-bold text-red-600">Peligro</th>
                      <th className="text-left p-3 font-bold text-amber-600">Aceptable</th>
                      <th className="text-left p-3 font-bold text-emerald-600">Objetivo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['CAC blended', 'Sube c/trimestre', 'Estable', 'Baja c/trimestre'],
                      ['LTV/CAC ratio', '<2x', '2-3x', '>3x'],
                      ['Payback period', '>12 meses', '6-12 meses', '<6 meses'],
                      ['CAR (activation)', '<20%', '20-40%', '>40%'],
                      ['Dependencia canal', '>70%', '50-70%', '<50%'],
                      ['Reviews verificadas', '<20', '20-50', '>50 con nota >4.0'],
                      ['Referral rate', '0%', '5-10%', '>15%'],
                    ].map(([metrica, peligro, aceptable, objetivo]) => (
                      <tr key={metrica} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-[#032149] text-xs">{metrica}</td>
                        <td className="p-3 text-red-600 text-xs">{peligro}</td>
                        <td className="p-3 text-amber-600 text-xs">{aceptable}</td>
                        <td className="p-3 text-emerald-600 font-semibold text-xs">{objetivo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── REGLAS FINALES ──────────────────────────────────────── */}
            <section className="mb-16">
              <h2 className="text-2xl font-black text-[#032149] mb-6">Las 5 Reglas del CAC Sostenible</h2>
              <div className="space-y-3">
                {[
                  { num: '1', rule: 'Confianza antes que tráfico.', desc: 'Si no controlas lo que encuentran al investigarte, más tráfico = más gente que te descarta.' },
                  { num: '2', rule: 'Activación antes que adquisición.', desc: 'De nada sirven 10.000 registros si solo el 15% experimenta tu valor.' },
                  { num: '3', rule: 'Sistemas antes que campañas.', desc: 'Las campañas mueren. Los sistemas componen. Cada euro en sistema reduce el CAC del siguiente.' },
                  { num: '4', rule: 'Attribution antes que escala.', desc: 'Si no sabes qué funciona, escalar solo amplifica el desperdicio.' },
                  { num: '5', rule: 'Referidos como canal, no como esperanza.', desc: 'Un programa productizado de referidos es el canal más rentable que puedes construir.' },
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
                  "El problema nunca es cuánto gastas. Es cuánto de lo que gastas se convierte en confianza, activación y retención. Eso es lo que baja el CAC de verdad."
                </p>
              </blockquote>
            </section>

            {/* ── CTA FINAL ───────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres implementarlo en tu empresa?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Trabajamos con empresas tech B2B y B2C para implementar este sistema y reducir su CAC. Agenda una llamada para ver si hay fit.
              </p>
              <a
                href="https://calendly.com/growth4u/consulta-estrategica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm"
              >
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

function BlockCard({
  num, title, icon, color, children,
}: {
  num: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-${color}-50/40 border border-${color}-100 rounded-2xl p-6 mb-4`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 bg-${color}-100 text-${color}-700 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="font-black text-[#032149] text-base">
          <span className={`text-${color}-600 mr-1`}>Bloque {num}:</span> {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function ChecklistItem({ text, num }: { text: string; num: number }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-white ${checked ? 'bg-emerald-50/50' : ''}`}
      onClick={() => setChecked(v => !v)}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
        {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-sm leading-relaxed ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        <span className="text-slate-400 text-xs mr-2">{num}.</span>{text}
      </span>
    </div>
  );
}
