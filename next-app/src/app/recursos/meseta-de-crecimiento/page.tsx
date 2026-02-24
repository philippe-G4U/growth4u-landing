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
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Zap,
  Target,
  BookOpen,
  Calendar,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

const STORAGE_KEY = 'lm_meseta_unlocked';

export default function MesetaPage() {
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
      await saveLeadMagnetLead({ name, email, company, leadMagnet: 'meseta-de-crecimiento' });
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
              <BookOpen className="w-3.5 h-3.5" /> Playbook Gratuito · Desbloqueo de Crecimiento
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Crecías rápido.<br />
              <span className="text-[#45b6f7]">Y de repente, se paró.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Los canales que funcionaban se saturaron. El CAC sube. Los registros crecen pero la activación cae.
              El equipo apaga fuegos todo el día. Y la respuesta siempre es la misma: <strong className="text-white">"hagamos otra campaña."</strong>
            </p>
          </div>
        </section>

        {/* ── PROBLEM + PROOF (always visible) ──────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong className="text-[#032149]">Pero nada funciona como antes.</strong> Porque lo que te trajo de 0 a 100K no te va a llevar
              de 100K a 500K. El growth de la primera fase es intuición. El de la segunda es sistema.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Y si sigues operando en modo intuición… <strong className="text-[#032149]">la meseta no se rompe. Se profundiza.</strong>
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#032149] mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6351d5]" />
            Lo que pasa cuando cambias de intuición a sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-gradient-to-br from-[#6351d5]/5 to-[#6351d5]/10 border border-[#6351d5]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">BNX</span>
                </div>
                <span className="font-bold text-[#032149]">Bnext</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Meses estancado en ~50K usuarios. N26 entraba con €50/cliente.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">10x</span>
                  <span className="text-sm text-slate-600">De 50K a 500K usuarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">€12,50</span>
                  <span className="text-sm text-slate-600">CAC vs €50 de N26</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0faec1]/5 to-[#0faec1]/10 border border-[#0faec1]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#032149] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-black">LYD</span>
                </div>
                <span className="font-bold text-[#032149]">Lydia</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">96% dependencia de tráfico de marca. Sin sistema de adquisición.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">4-5x</span>
                  <span className="text-sm text-slate-600">activaciones/semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">6m</span>
                  <span className="text-sm text-slate-600">con el mismo presupuesto</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 leading-relaxed">
            <strong>No más dinero. Más sistema.</strong> En este playbook tienes el framework de 4 palancas, los casos reales completos y el plan de desbloqueo en 30 días.
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
                <h2 className="text-2xl md:text-3xl font-black mb-2">Accede al playbook completo</h2>
                <p className="text-white/70 mb-8 text-sm leading-relaxed">
                  Desbloquea las 4 palancas de desbloqueo, el autodiagnóstico de 12 puntos, los casos reales y el plan de acción de 30 días.
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
                      <><Unlock className="w-4 h-4" /> Acceder al playbook gratuito</>
                    )}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Dentro encontrarás:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/60">
                    {[
                      '5 señales de que estás en meseta',
                      '4 palancas de desbloqueo',
                      'Caso real: Bnext 50K → 500K',
                      'Caso real: Lydia 4-5x activaciones',
                      'Autodiagnóstico de 12 puntos',
                      'Plan de acción 30 días',
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
                <p className="font-bold text-emerald-800 text-sm">Playbook desbloqueado</p>
                <p className="text-emerald-700 text-xs">Tienes acceso completo. Guarda esta página en favoritos.</p>
              </div>
            </div>

            {/* ── PARTE 1: POR QUÉ TE HAS ESTANCADO ──────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">1</div>
                <h2 className="text-2xl font-black text-[#032149]">Por Qué Te Has Estancado (Y No Es lo que Crees)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Creciste rápido al principio. Todo funcionaba. Y de repente… se paró. O peor: sigue creciendo, pero lento, errático, cada vez más caro.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <p className="text-amber-800 text-sm font-semibold">
                  Esto no es un fallo. Es una fase. El problema es que la mayoría responde de la peor forma: haciendo más de lo mismo, pero más fuerte.
                </p>
              </div>

              <h3 className="font-bold text-[#032149] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Las 5 Señales de que Estás en la Meseta
              </h3>
              <div className="space-y-3">
                {[
                  { num: '1', title: 'Tu CAC sube cada trimestre', desc: 'Los canales que funcionaban se saturaron. Paid sigue trayendo usuarios, pero cada vez más caros. El ROAS baja y nadie sabe exactamente por qué.' },
                  { num: '2', title: 'Registros suben, activación baja', desc: 'Más gente entra, menos gente se queda. Tu embudo se ensancha arriba pero se estrecha abajo. Tienes un problema de activación, no de adquisición.' },
                  { num: '3', title: 'Dependes de 1-2 canales', desc: 'Si mañana Meta sube los precios un 30% o Google cambia el algoritmo, ¿qué pasa? Sin diversificación no hay resiliencia.' },
                  { num: '4', title: 'No tienes referidos orgánicos', desc: 'Tus usuarios no te recomiendan. No porque no les gustes — sino porque no has diseñado un mecanismo para que lo hagan.' },
                  { num: '5', title: 'Tu equipo apaga fuegos', desc: 'Sin tiempo para pensar estratégicamente. Todo es reactivo. Cada semana es una nueva urgencia.' },
                ].map(({ num, title, desc }) => (
                  <div key={num} className="flex items-start gap-4 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                    <span className="w-7 h-7 bg-red-100 text-red-600 rounded-full text-sm font-black flex items-center justify-center flex-shrink-0">{num}</span>
                    <div>
                      <p className="font-bold text-[#032149] text-sm mb-1">{title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-slate-800 rounded-xl p-4 text-white text-sm text-center">
                Si marcas 3 o más señales, no tienes un problema de ejecución. <strong>Tienes un problema de sistema.</strong>
              </div>
            </section>

            {/* ── PARTE 2: LAS 4 PALANCAS ──────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">2</div>
                <h2 className="text-2xl font-black text-[#032149]">El Framework de Desbloqueo — Las 4 Palancas</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">La meseta no se rompe haciendo más. Se rompe haciendo diferente.</p>

              {/* Palanca 1 */}
              <PalanacCard num="1" title="Trust Fortress — Controlar la Narrativa Antes de Amplificar" icon={<Shield className="w-5 h-5" />} color="violet">
                <div className="text-sm text-slate-600 space-y-2 mb-4">
                  <p><strong className="text-red-600">El problema:</strong> Inviertes en que te vean, pero cuando te investigan, no encuentran suficientes pruebas de que eres de fiar.</p>
                  <p><strong className="text-emerald-600">La solución:</strong> Construir una infraestructura de confianza ANTES de amplificar.</p>
                </div>
                <h4 className="text-xs font-bold text-[#032149] uppercase tracking-wide mb-2">Acciones concretas:</h4>
                <ChecklistBlock items={[
                  'Audita tus reviews: ¿cuántas tienes? ¿qué nota? ¿cuándo fue la última?',
                  'Busca tu marca en Google modo incógnito — ¿qué ve un prospecto?',
                  'Pregunta a ChatGPT y Perplexity sobre tu marca — ¿qué dicen?',
                  'Identifica 3 waterholes (Reddit, foros, comparativas) donde tu mercado investiga',
                  'Crea un plan de activación de reviews con tus 20 clientes más satisfechos',
                ]} color="violet" />
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: 'Nota reviews', value: '>4.0' },
                    { label: 'Reviews verificadas', value: '>50' },
                    { label: 'Control marca Google', value: 'Top 10' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-violet-50 border border-violet-200 rounded-lg p-2 text-center">
                      <p className="font-black text-violet-700">{value}</p>
                      <p className="text-violet-600">{label}</p>
                    </div>
                  ))}
                </div>
              </PalanacCard>

              {/* Palanca 2 */}
              <PalanacCard num="2" title='Activación Rediseñada — El "Momento Aha" en menos de 10 Minutos' icon={<Zap className="w-5 h-5" />} color="amber">
                <div className="text-sm text-slate-600 space-y-2 mb-4">
                  <p><strong className="text-red-600">El problema:</strong> Demasiados usuarios se registran pero nunca experimentan tu valor real.</p>
                  <p><strong className="text-emerald-600">La solución:</strong> Diseñar un "momento aha" que ocurra lo antes posible.</p>
                </div>
                <div className="overflow-x-auto rounded-xl border border-amber-200 mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-amber-50 border-b border-amber-200">
                        <th className="text-left p-2 font-bold text-[#032149]">Métrica</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Qué mide</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Objetivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {[
                        ['CAR', '% registros que experimentan el "aha"', '>50%'],
                        ['Time to Value', 'Tiempo desde registro hasta valor', '<10 min'],
                        ['Drop-off por paso', '% abandonan en cada paso', 'Identificar #1'],
                      ].map(([m, q, o]) => (
                        <tr key={m}>
                          <td className="p-2 font-semibold text-amber-700">{m}</td>
                          <td className="p-2 text-slate-600">{q}</td>
                          <td className="p-2 font-bold text-emerald-600">{o}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ChecklistBlock items={[
                  'Mapea tu journey actual: ¿cuántos pasos desde registro hasta valor?',
                  'Identifica los puntos de fricción: ¿dónde abandonan los usuarios?',
                  'Define tu "momento aha" — ¿cuál es la acción que demuestra valor?',
                  'Rediseña el onboarding para que esa acción ocurra en <10 minutos',
                  'Mide CAR: % de registros que completan la acción de valor',
                ]} color="amber" />
              </PalanacCard>

              {/* Palanca 3 */}
              <PalanacCard num="3" title="Referidos Productizados — Convierte Usuarios en Canal" icon={<Users className="w-5 h-5" />} color="green">
                <div className="text-sm text-slate-600 space-y-2 mb-4">
                  <p><strong className="text-red-600">El problema:</strong> Los referidos "orgánicos" no escalan. Esperar que la gente te recomiende es una estrategia de esperanza.</p>
                  <p><strong className="text-emerald-600">La solución:</strong> Productivizar los referidos. Diseñar un sistema donde recomendar sea fácil y tenga incentivo.</p>
                </div>
                <h4 className="text-xs font-bold text-[#032149] uppercase tracking-wide mb-3">Los 3 niveles de referidos:</h4>
                <div className="space-y-3 mb-4">
                  {[
                    { level: 'Nivel 1', title: 'Referido pasivo (mes 1)', desc: 'Botón de "Invitar amigo" visible post-activación. Incentivo simple. Tracking básico.' },
                    { level: 'Nivel 2', title: 'Incentivo doble (mes 2)', desc: 'El que invita Y el invitado reciben valor. Ejemplo: "Invita a un amigo → ambos recibís X".' },
                    { level: 'Nivel 3', title: 'Embajadores (mes 3+)', desc: 'Top 10% usuarios más activos. Programa exclusivo. Acceso anticipado, reconocimiento, rewards escalados.' },
                  ].map(({ level, title, desc }) => (
                    <div key={level} className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm">
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">{level}</span>
                      <div>
                        <p className="font-bold text-[#032149] text-xs">{title}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PalanacCard>

              {/* Palanca 4 */}
              <PalanacCard num="4" title="Attribution Real — Mide lo que Importa" icon={<BarChart3 className="w-5 h-5" />} color="blue">
                <div className="text-sm text-slate-600 space-y-2 mb-4">
                  <p><strong className="text-red-600">El problema:</strong> No sabes qué funciona. Sin attribution, no puedes optimizar. Y si no puedes optimizar, no puedes escalar.</p>
                  <p><strong className="text-emerald-600">La solución:</strong> Medir CAR por canal, no solo registros por canal.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
                  <strong>El error más común:</strong> Medir el volumen de registros por canal y asumir que el canal con más registros es el mejor. El mejor canal es el que trae usuarios que SE ACTIVAN.
                </div>
                <div className="overflow-x-auto rounded-xl border border-blue-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-blue-50 border-b border-blue-200">
                        <th className="text-left p-2 font-bold text-[#032149]">Canal</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Registros</th>
                        <th className="text-left p-2 font-bold text-[#032149]">CAR</th>
                        <th className="text-left p-2 font-bold text-[#032149]">CAC</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Veredicto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-50">
                      {[
                        ['Meta Ads', '500', '15%', '€40', '🔴 Calidad baja'],
                        ['Google Search', '200', '45%', '€25', '🟢 Alta intención'],
                        ['Influencer', '150', '40%', '€18', '🟢 Alta confianza'],
                        ['Referidos', '80', '70%', '€5', '🟢🟢 El mejor canal'],
                      ].map(row => (
                        <tr key={row[0]} className="hover:bg-blue-50/50">
                          {row.map((cell, i) => (
                            <td key={i} className={`p-2 ${i === 4 ? 'font-semibold' : 'text-slate-600'}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PalanacCard>
            </section>

            {/* ── PARTE 3: CASO BNEXT ──────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">3</div>
                <h2 className="text-2xl font-black text-[#032149]">Caso Real — El Desbloqueo de Bnext</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">De 50K estancados a 500K en 17 meses</p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-[#032149] mb-3 text-sm">El Estancamiento</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  Bnext llevaba meses estancado en ~50K usuarios. Todo lo que había funcionado al principio se había agotado. Mientras tanto, N26 entraba en España con <strong>€50 por cada cliente adquirido.</strong>
                </p>
                <p className="text-slate-600 text-sm">Bnext no podía competir en gasto. Necesitaba otra estrategia.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-[#032149] mb-3 text-sm">El Diagnóstico — 5 de 5 señales</h3>
                <div className="space-y-1">
                  {[
                    'CAC subiendo — los canales paid cada vez más caros',
                    'Activación cayendo — mucha gente se registraba pero no hacía su primera transacción',
                    'Dependencia de 1-2 canales — PR + boca a boca se habían agotado',
                    'Cero referidos productizados — no había programa formal',
                    'Equipo reactivo — todo era "campaña del mes"',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="text-red-500 flex-shrink-0">✅</span> {item}
                    </div>
                  ))}
                </div>
                <p className="text-red-800 font-semibold text-xs mt-3">Resultado: estancamiento estructural, no táctico.</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-[#032149] mb-4 text-sm">Las 4 Palancas en Acción</h3>
                <div className="space-y-4">
                  {[
                    { p: 'Palanca 1: Trust Fortress', items: ['Reviews activas en App Store y Trustpilot', 'Presencia en comparativas del sector', 'Datos reales publicados, pricing sin letra pequeña', 'Resultado: 4.4 estrellas, todas las comparativas relevantes'] },
                    { p: 'Palanca 2: Activación', items: ['Onboarding original: 15+ minutos hasta primera transacción', 'Nuevo: primera transacción en menos de 5 minutos', 'Se eliminaron 4 pasos innecesarios del proceso de alta', 'CAR: de ~20% a ~70%'] },
                    { p: 'Palanca 3: Referidos', items: ['Programa con doble incentivo', 'Comunicación post-activación', 'Top usuarios convertidos en embajadores'] },
                    { p: 'Palanca 4: Attribution', items: ['Un blogger de viajes trajo 200 clientes en un fin de semana', 'Canales mapeados por CAR, no por volumen', 'Presupuesto redistributed hacia micro-influencers'] },
                  ].map(({ p, items }) => (
                    <div key={p}>
                      <p className="font-bold text-[#032149] text-xs mb-2">{p}</p>
                      <div className="space-y-1">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <ChevronRight className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </div>
                        ))}
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
                      <th className="text-left p-3 font-bold text-slate-500">Antes</th>
                      <th className="text-left p-3 font-bold text-emerald-600">Después</th>
                      <th className="text-left p-3 font-bold text-[#6351d5]">Cambio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Usuarios totales', '~50K estancados', '500K', '10x'],
                      ['CAC', '€30-40 (subiendo)', '€12,50', '-65%'],
                      ['vs N26', '—', '€50 (N26)', '4x más eficiente'],
                      ['Tiempo a 300K', '—', '17 meses', 'N26 tardó 58'],
                    ].map(([m, a, d, c]) => (
                      <tr key={m} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#032149] text-xs">{m}</td>
                        <td className="p-3 text-slate-500 text-xs">{a}</td>
                        <td className="p-3 text-emerald-700 font-semibold text-xs">{d}</td>
                        <td className="p-3 text-[#6351d5] font-black text-xs">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── PARTE 4: CASO LYDIA ───────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">4</div>
                <h2 className="text-2xl font-black text-[#032149]">Caso Complementario — Lydia</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">De 1K a 4.5K activaciones/semana con el mismo presupuesto</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-[#6351d5]">4-5x</p>
                  <p className="text-sm text-slate-600">activaciones/semana</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-emerald-600">=€</p>
                  <p className="text-sm text-slate-600">mismo presupuesto</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-amber-600">&lt;6m</p>
                  <p className="text-sm text-slate-600">para lograrlo</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm">
                <p className="font-bold text-[#032149] mb-2">La situación inicial:</p>
                <p className="text-slate-600 mb-4">96% dependencia de tráfico de marca. Cero sistema de adquisición proactiva. Cero diversificación. El crecimiento era "orgánico" en el peor sentido: incontrolable e impredecible.</p>
                <p className="font-bold text-[#032149] mb-2">El desbloqueo:</p>
                <div className="space-y-1">
                  {[
                    'Palanca 2 (Activación): Rediseño del primer uso para que el valor fuera inmediato',
                    'Palanca 3 (Referidos): Programa productivizado que convirtió usuarios en canal',
                    'Palanca 4 (Attribution): Mapeo de qué canales traían usuarios que realmente se activaban',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <ChevronRight className="w-4 h-4 text-[#6351d5] flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PARTE 5: AUTODIAGNÓSTICO ──────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">5</div>
                <h2 className="text-2xl font-black text-[#032149]">Autodiagnóstico — ¿Dónde Está tu Cuello de Botella?</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Marca cada punto que aplica a tu situación</p>

              {[
                {
                  block: 'Adquisición',
                  color: 'red',
                  items: [
                    'Mi CAC ha subido más de un 20% en los últimos 6 meses',
                    'Dependo de 1-2 canales para más del 70% del tráfico',
                    'Si Meta/Google cambiara las reglas mañana, mi negocio sufriría gravemente',
                  ],
                },
                {
                  block: 'Activación',
                  color: 'amber',
                  items: [
                    'Menos del 30% de mis registros hacen la acción de valor principal',
                    'El onboarding tarda más de 10 minutos hasta el primer "momento aha"',
                    'No tengo claro cuál es exactamente mi "momento aha"',
                  ],
                },
                {
                  block: 'Retención y Referidos',
                  color: 'blue',
                  items: [
                    'No tengo un programa de referidos activo',
                    'Menos del 5% de mis usuarios han invitado a alguien',
                    'No sé cuántos de mis nuevos usuarios vienen de referidos',
                  ],
                },
                {
                  block: 'Attribution',
                  color: 'violet',
                  items: [
                    'No puedo decir con confianza qué canal trae los mejores usuarios',
                    'Mido registros por canal pero no activaciones por canal',
                    'No tengo un ritual semanal de revisión de métricas',
                  ],
                },
              ].map(({ block, color, items }) => (
                <div key={block} className={`bg-${color}-50/40 border border-${color}-100 rounded-2xl p-5 mb-4`}>
                  <p className={`font-bold text-${color}-700 text-xs uppercase tracking-wide mb-3`}>Bloque {block}</p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <ChecklistItem key={i} text={item} num={i + 1} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="overflow-x-auto rounded-xl border border-slate-200 mt-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-[#032149]">Puntuación</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Diagnóstico</th>
                      <th className="text-left p-3 font-bold text-[#032149]">Prioridad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['1-3 señales', 'Pre-meseta — tienes margen', 'Empieza por Attribution'],
                      ['4-6 señales', 'En meseta — real y estructural', 'Trust Fortress + Activación'],
                      ['7-9 señales', 'Meseta crítica', 'Las 4 palancas, empieza por activación'],
                      ['10-12 señales', 'Emergencia — cada mes perdido', 'Necesitas ayuda externa + las 4 palancas'],
                    ].map(([score, diag, prio]) => (
                      <tr key={score} className="hover:bg-slate-50">
                        <td className="p-3 font-black text-[#6351d5] text-sm">{score}</td>
                        <td className="p-3 text-slate-700 text-sm">{diag}</td>
                        <td className="p-3 text-slate-500 text-xs">{prio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── PARTE 6: PLAN 30 DÍAS ─────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">6</div>
                <h2 className="text-2xl font-black text-[#032149]">Plan de Acción — Desbloqueo en 30 Días</h2>
              </div>

              <div className="space-y-4 mt-6">
                {[
                  {
                    week: 'Semana 1', title: 'Diagnóstico y Attribution', color: 'blue',
                    items: [
                      'Completa el autodiagnóstico — identifica tu bloque más débil',
                      'Define tu métrica de activación (la acción que demuestra valor real)',
                      'Crea un dashboard mínimo: registros, activaciones y CAR por canal',
                      'Haz la prueba de Waterholes: busca tu marca en foros, Reddit, comparativas',
                    ],
                  },
                  {
                    week: 'Semana 2', title: 'Trust Fortress (Quick Win)', color: 'violet',
                    items: [
                      'Googlea tu marca en modo incógnito — ¿qué ve un prospecto?',
                      'Pregunta a ChatGPT y Perplexity sobre tu marca y categoría',
                      'Contacta a 10 clientes satisfechos para pedir reviews',
                      'Identifica 3 comparativas del sector donde deberías estar',
                    ],
                  },
                  {
                    week: 'Semana 3', title: 'Activación', color: 'amber',
                    items: [
                      'Mapea tu journey actual: ¿cuántos pasos desde registro hasta valor?',
                      'Identifica el punto exacto de mayor drop-off',
                      'Diseña una versión simplificada: objetivo = valor en menos de 10 minutos',
                      'Lanza un test A/B: onboarding actual vs. simplificado',
                    ],
                  },
                  {
                    week: 'Semana 4', title: 'Referidos + Iteración', color: 'emerald',
                    items: [
                      'Lanza un programa de referidos Nivel 1 (botón + incentivo simple)',
                      'Comunica el programa a tu base activa (email + in-app)',
                      'Revisa el dashboard de la Semana 1: ¿qué canales tienen mejor CAR?',
                      'Redistribuye el 20% del presupuesto hacia los canales con mejor CAR',
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

            {/* ── PARTE 7: LAS 5 REGLAS ─────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">7</div>
                <h2 className="text-2xl font-black text-[#032149]">Las 5 Reglas del Desbloqueo</h2>
              </div>
              <div className="space-y-3">
                {[
                  { num: '1', rule: 'La meseta no es un fracaso. Es una señal.', desc: 'Significa que lo que te trajo hasta aquí ya cumplió su función. Ahora necesitas un sistema diferente para el siguiente nivel.' },
                  { num: '2', rule: 'Más presupuesto no rompe la meseta. Más sistema sí.', desc: 'Si duplicas el presupuesto de un canal saturado, solo duplicas el desperdicio.' },
                  { num: '3', rule: 'Mide activaciones, no registros.', desc: 'Un registro sin activación es un coste, no un usuario. El canal con 100 registros y 10% CAR es peor que el de 30 con 50%.' },
                  { num: '4', rule: 'Los referidos son tu mejor canal. Pero no ocurren solos.', desc: 'Un programa bien diseñado tiene mejor CAC, activación y retención que cualquier canal de pago. Hay que construirlo como un producto.' },
                  { num: '5', rule: 'El sistema compone. Las tácticas no.', desc: 'Una campaña termina cuando se acaba el presupuesto. Un sistema sigue generando resultados mientras existe.' },
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
                  "Bnext llegó a 500K usuarios en 17 meses. N26 tardó 58. No ganó el que más gastó. Ganó el que construyó mejor sistema. La meseta no se rompe con más fuerza. Se rompe con más inteligencia."
                </p>
              </blockquote>
            </section>

            {/* ── CTA FINAL ───────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres implementar las 4 palancas?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Trabajamos con empresas tech B2B y B2C para desbloquear su crecimiento usando este sistema. Agenda una llamada para ver si hay fit.
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

function PalanacCard({ num, title, icon, color, children }: {
  num: string; title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className={`bg-${color}-50/40 border border-${color}-100 rounded-2xl p-6 mb-4`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 bg-${color}-100 text-${color}-700 rounded-lg flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <h3 className="font-black text-[#032149] text-base">
          <span className={`text-${color}-600 mr-1`}>Palanca {num}:</span> {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function ChecklistBlock({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
          <div className={`w-4 h-4 border-2 border-${color}-300 rounded flex-shrink-0 mt-0.5`} />
          {item}
        </div>
      ))}
    </div>
  );
}

function ChecklistItem({ text, num }: { text: string; num: number }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-white/60 ${checked ? 'opacity-60' : ''}`}
      onClick={() => setChecked(v => !v)}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
        {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-sm leading-relaxed ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {text}
      </span>
    </div>
  );
}
