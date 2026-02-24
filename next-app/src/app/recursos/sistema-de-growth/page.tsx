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
  Repeat,
  BarChart3,
  Shield,
  Zap,
  Target,
  BookOpen,
  Calendar,
  ChevronRight,
  Layers,
  RefreshCw,
} from 'lucide-react';

const STORAGE_KEY = 'lm_sistema_growth_unlocked';

export default function SistemaDeGrowthPage() {
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
      await saveLeadMagnetLead({ name, email, company, leadMagnet: 'sistema-de-growth' });
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
              <BookOpen className="w-3.5 h-3.5" /> Guía Gratuita · De Tácticas a Sistema de Growth
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Haces ads, posts, emails, webinars…<br />
              <span className="text-[#45b6f7]">y nada compone.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Cada semana hay una nueva campaña. Una nueva idea. Una nueva urgencia. Trabajas sin parar pero los
              resultados no se acumulan. <strong className="text-white">Cada acción empieza de cero.</strong>
            </p>
          </div>
        </section>

        {/* ── PROBLEM + PROOF (always visible) ──────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
            <p className="text-slate-700 leading-relaxed mb-4">
              Tienes tácticas. No tienes sistema. Y la diferencia es brutal: las tácticas dan resultados lineales
              (haces → obtienes → para). Los sistemas dan resultados compuestos (haces → obtienes → mejora → obtienes más).
            </p>
            <p className="text-slate-700 font-semibold text-[#032149]">
              Estás en una cinta de correr: te mueves mucho pero no avanzas.
            </p>
          </div>

          <h2 className="text-xl font-bold text-[#032149] mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#6351d5]" />
            Lo que pasa cuando conectas las piezas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-gradient-to-br from-[#6351d5]/5 to-[#6351d5]/10 border border-[#6351d5]/20 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Empresa tech — 250K€/mes en paid</p>
              <p className="text-sm text-slate-600 mb-4">Cada campaña era un evento aislado. Sin flywheel. Sin compounding. CAC subiendo cada trimestre.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">-70%</span>
                  <span className="text-sm text-slate-600">CAC tras conectar los 5 bloques</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#6351d5]">x2</span>
                  <span className="text-sm text-slate-600">LTV con mejor activación</span>
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
              <p className="text-sm text-slate-600 mb-4">De "campaña del mes" a sistema de growth.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">10x</span>
                  <span className="text-sm text-slate-600">50K → 500K usuarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0faec1]">17m</span>
                  <span className="text-sm text-slate-600">lo que N26 tardó 58</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 leading-relaxed">
            <strong>La diferencia no fue hacer más. Fue conectar lo que ya hacían.</strong> En esta guía tienes los 5 bloques del sistema, el diagrama del flywheel y el plan para conectar tus tácticas en 30 días.
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
                <h2 className="text-2xl md:text-3xl font-black mb-2">Accede al sistema completo</h2>
                <p className="text-white/70 mb-8 text-sm leading-relaxed">
                  Desbloquea los 5 bloques del sistema, el flywheel de growth, el diagnóstico de 12 puntos y el plan de 30 días.
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
                      <><Unlock className="w-4 h-4" /> Acceder al sistema gratuito</>
                    )}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Dentro encontrarás:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/60">
                    {[
                      'Tácticas vs Sistema (tabla comparativa)',
                      'Los 5 bloques del sistema de growth',
                      'El flywheel — cómo se conectan',
                      'Caso real: -70% CAC + x2 LTV',
                      'Diagnóstico de 12 preguntas',
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
                <p className="font-bold text-emerald-800 text-sm">Sistema desbloqueado</p>
                <p className="text-emerald-700 text-xs">Tienes acceso completo. Guarda esta página en favoritos.</p>
              </div>
            </div>

            {/* ── PARTE 1: SÍNTOMA ────────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">1</div>
                <h2 className="text-2xl font-black text-[#032149]">El Síntoma Más Común (Y el Más Peligroso)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Haces cosas. Muchas cosas. Ads, posts, colaboraciones, emails, landing pages, webinars. Y sin embargo, nada compone.
                Cada acción empieza de cero. Los resultados no se acumulan. <strong className="text-[#032149]">Eso no es growth. Es supervivencia.</strong>
              </p>

              <h3 className="font-bold text-[#032149] mb-4 text-sm uppercase tracking-wide">La Diferencia entre Tácticas y Sistema</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-[#032149]">Dimensión</th>
                      <th className="text-left p-3 font-bold text-red-600">Tácticas Sueltas</th>
                      <th className="text-left p-3 font-bold text-emerald-600">Sistema de Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Conexión', 'Cada acción es independiente', 'Cada acción alimenta a la siguiente'],
                      ['Resultados', 'Lineales: haces → obtienes → para', 'Compuestos: haces → obtienes → mejora → obtienes más'],
                      ['Dependencia', 'Del fundador/equipo 24/7', 'Funciona aunque tú no estés'],
                      ['CAC', 'Sube con el tiempo (saturación)', 'Baja con el tiempo (compounding)'],
                      ['Métricas', '"Creemos que funciona"', '"Sabemos qué funciona y por qué"'],
                      ['Escalabilidad', 'Escalar = más personas haciendo más', 'Escalar = el sistema absorbe más volumen'],
                    ].map(([dim, mal, bien]) => (
                      <tr key={dim} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#032149] text-xs">{dim}</td>
                        <td className="p-3 text-red-600 text-xs">{mal}</td>
                        <td className="p-3 text-emerald-600 text-xs">{bien}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <strong>La trampa:</strong> Las tácticas sueltas te dan resultados a corto plazo. Por eso parecen funcionar. Pero cada resultado es un evento aislado que no mejora el siguiente. Estás en una cinta de correr: te mueves mucho pero no avanzas.
              </div>
            </section>

            {/* ── PARTE 2: LOS 5 BLOQUES ───────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">2</div>
                <h2 className="text-2xl font-black text-[#032149]">Los 5 Bloques de un Sistema de Growth</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Una máquina con partes interconectadas donde cada bloque alimenta al siguiente</p>

              {/* Block 1 */}
              <SystemBlock num="1" title="Diagnóstico de Mercado (Waterholes)" icon={<Target className="w-5 h-5" />} color="blue">
                <p className="text-slate-600 text-sm mb-3">
                  Entender qué dice tu mercado cuando tú no estás delante. Reddit, foros, comentarios de YouTube, comparativas, reviews de competidores.
                  Estos son tus "waterholes" — los lugares donde el mercado habla sin filtros.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
                  <strong>Por qué es un bloque del sistema:</strong> Porque lo que descubres aquí alimenta TODOS los demás bloques. Tu messaging, tu contenido, tu onboarding, tu pricing.
                </div>
                <h4 className="text-xs font-bold text-[#032149] uppercase tracking-wide mb-2">Acciones concretas:</h4>
                <ChecklistBlock items={[
                  'Identifica 5 waterholes donde tu audiencia habla sin filtros',
                  'Dedica 1 hora/semana a leer y anotar patrones',
                  'Crea un documento vivo con las 3 objeciones principales que aparecen',
                  'Revisa reviews de tus competidores: ¿qué quejas se repiten?',
                  'Pregunta a ChatGPT/Perplexity sobre tu categoría: ¿qué recomienda?',
                ]} color="blue" />
                <p className="text-xs text-blue-700 mt-3 font-semibold">
                  Output: Un mapa de objeciones, deseos y lenguaje real del mercado. Se actualiza cada mes.
                </p>
              </SystemBlock>

              {/* Block 2 */}
              <SystemBlock num="2" title="Trust Fortress (Infraestructura de Confianza)" icon={<Shield className="w-5 h-5" />} color="violet">
                <p className="text-slate-600 text-sm mb-3">
                  El conjunto de pruebas de confianza que tu prospecto encuentra cuando te investiga. Reviews, comparativas, menciones en medios, contenido transparente.
                </p>
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-4 text-xs text-violet-800">
                  <strong>Por qué es un bloque del sistema:</strong> Porque sin confianza, todo lo demás falla. Puedes tener el mejor producto y los mejores ads — si no encuentran pruebas, no compran.
                </div>
                <h4 className="text-xs font-bold text-[#032149] uppercase tracking-wide mb-2">Los 4 pilares:</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { t: 'Reviews verificadas', d: '>50 reviews, nota >4.0, recientes' },
                    { t: 'SEO/GEO', d: 'Controlar Google + IAs al buscarte' },
                    { t: 'PR/Editorial', d: 'Que otros hablen de ti' },
                    { t: 'Contenido transparente', d: 'Casos reales, pricing claro, behind the scenes' },
                  ].map(({ t, d }) => (
                    <div key={t} className="bg-violet-50/60 border border-violet-100 rounded-lg p-2">
                      <p className="font-semibold text-[#032149] text-xs">{t}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{d}</p>
                    </div>
                  ))}
                </div>
                <ChecklistBlock items={[
                  'Audita tu presencia de confianza: ¿qué ve un prospecto al googlear tu marca?',
                  'Activa reviews con tus 20 clientes más satisfechos',
                  'Verifica tu Schema Markup',
                  'Registra tu sitio en Bing Webmaster Tools (ChatGPT lee Bing)',
                  'Identifica 3 comparativas del sector donde deberías aparecer',
                ]} color="violet" />
              </SystemBlock>

              {/* Block 3 */}
              <SystemBlock num="3" title="Activación (El Momento Aha)" icon={<Zap className="w-5 h-5" />} color="amber">
                <p className="text-slate-600 text-sm mb-3">
                  El proceso que convierte un registro en un usuario activo que experimentó el valor real.
                  Un CAR del 20% significa que el 80% de tu inversión en adquisición se pierde.
                </p>
                <div className="overflow-x-auto rounded-xl border border-amber-200 mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-amber-50 border-b border-amber-200">
                        <th className="text-left p-2 font-bold text-[#032149]">Tipo de producto</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Momento aha típico</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Objetivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-50">
                      {[
                        ['App financiera', 'Primera transacción completada', '<5 min'],
                        ['SaaS B2B', 'Primera integración o dato importado', '<10 min'],
                        ['Marketplace', 'Primera compra o primera venta', '<15 min'],
                        ['Servicio/Agencia', 'Primer resultado tangible', '<48 horas'],
                      ].map(([tipo, aha, obj]) => (
                        <tr key={tipo}>
                          <td className="p-2 font-semibold text-amber-700">{tipo}</td>
                          <td className="p-2 text-slate-600">{aha}</td>
                          <td className="p-2 font-bold text-emerald-600">{obj}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ChecklistBlock items={[
                  'Define tu "momento aha" específico',
                  'Mapea cuántos pasos hay desde registro hasta ese momento',
                  'Elimina cada paso que no sea estrictamente necesario',
                  'Mide CAR actual: % de registros que llegan al momento aha',
                  'Objetivo: CAR >50% en menos de 10 minutos',
                ]} color="amber" />
              </SystemBlock>

              {/* Block 4 */}
              <SystemBlock num="4" title="Referidos Productizados (El Multiplicador)" icon={<Repeat className="w-5 h-5" />} color="green">
                <p className="text-slate-600 text-sm mb-3">
                  Un sistema diseñado para que tus usuarios activos traigan nuevos usuarios. No "boca a boca" pasivo — un programa activo con incentivos, tracking y comunicación.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-xs text-emerald-800">
                  <strong>La conexión con los otros bloques:</strong> Waterholes informa el messaging → Trust Fortress refuerza la confianza del referido → Activación crea usuarios que refieren con convicción → Attribution mide el impacto real.
                </div>
                <ChecklistBlock items={[
                  'Diseña un incentivo que tenga sentido para tu producto',
                  'Implementa tracking: ¿quién invitó a quién? ¿se activó?',
                  'Comunica el programa post-activación (solo refiere quien experimentó valor)',
                  'Lanza con tus top 10% usuarios más activos primero',
                  'Mide y compara: CAC de referido vs CAC de otros canales',
                ]} color="green" />
              </SystemBlock>

              {/* Block 5 */}
              <SystemBlock num="5" title="Attribution y Optimización (El Cerebro)" icon={<BarChart3 className="w-5 h-5" />} color="slate">
                <p className="text-slate-600 text-sm mb-3">
                  La capacidad de saber exactamente qué funciona, qué no, y por qué. No "registros por canal" — sino activaciones por canal, CAC real, y calidad del usuario por fuente.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left p-2 font-bold text-[#032149]">Métrica</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Qué mide</th>
                        <th className="text-left p-2 font-bold text-[#032149]">Frecuencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['CAR por canal', '% activación por fuente', 'Semanal'],
                        ['CAC real', 'Coste por usuario ACTIVADO', 'Semanal'],
                        ['Referidos/usuario', 'Cuántos nuevos trae cada activo', 'Mensual'],
                        ['Reviews/mes', 'Velocidad de generación de trust', 'Mensual'],
                        ['Time to Value', 'Tiempo hasta momento aha', 'Semanal'],
                      ].map(([m, q, f]) => (
                        <tr key={m}>
                          <td className="p-2 font-semibold text-slate-700">{m}</td>
                          <td className="p-2 text-slate-600">{q}</td>
                          <td className="p-2 text-slate-500">{f}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ChecklistBlock items={[
                  'Implementa tracking de activación (no solo registro) por canal',
                  'Crea un dashboard con las 5 métricas de arriba',
                  'Establece un ritual semanal: 15 min cada viernes',
                  'Cada mes: redistribuye 20% del presupuesto hacia canales con mejor CAR',
                  'Documenta aprendizajes: ¿qué cambió? ¿por qué? ¿qué haríamos diferente?',
                ]} color="slate" />
              </SystemBlock>
            </section>

            {/* ── PARTE 3: EL FLYWHEEL ──────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">3</div>
                <h2 className="text-2xl font-black text-[#032149]">El Flywheel — Cómo los 5 Bloques se Conectan</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Esto es lo que diferencia un sistema de una lista de tácticas: los bloques se alimentan entre sí</p>

              {/* Visual flywheel */}
              <div className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 mb-8">
                <div className="flex flex-col items-center gap-0 text-white">
                  {[
                    { num: '1', label: 'WATERHOLES', sublabel: 'Diagnóstico de mercado', arrow: 'informa messaging' },
                    { num: '2', label: 'TRUST FORTRESS', sublabel: 'Infraestructura de confianza', arrow: 'genera confianza' },
                    { num: '3', label: 'ACTIVACIÓN', sublabel: 'Momento aha', arrow: 'genera usuarios activos' },
                    { num: '4', label: 'REFERIDOS', sublabel: 'El multiplicador', arrow: 'trae nuevos usuarios' },
                    { num: '5', label: 'ATTRIBUTION', sublabel: 'El cerebro — optimiza todo', arrow: null },
                  ].map(({ num, label, sublabel, arrow }, i) => (
                    <div key={num} className="flex flex-col items-center w-full max-w-sm">
                      <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-4 text-center w-full">
                        <div className="flex items-center justify-center gap-3">
                          <span className="w-7 h-7 bg-[#6351d5] rounded-lg text-white text-xs font-black flex items-center justify-center">{num}</span>
                          <div className="text-left">
                            <p className="font-black text-sm">{label}</p>
                            <p className="text-white/60 text-xs">{sublabel}</p>
                          </div>
                        </div>
                      </div>
                      {arrow && (
                        <div className="flex flex-col items-center py-2">
                          <div className="w-px h-4 bg-white/30" />
                          <span className="text-white/50 text-xs">{arrow}</span>
                          <div className="w-px h-4 bg-white/30" />
                          <svg className="w-3 h-3 text-[#45b6f7]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 17l-7-7 1.41-1.41L10 14.17l5.59-5.58L17 10z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-4 text-[#45b6f7] text-xs font-semibold">
                    <RefreshCw className="w-4 h-4" />
                    <span>Optimiza todos los bloques → vuelve a empezar</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { step: '1 → 2', desc: 'Waterholes: Descubres qué dice el mercado → Informas tu messaging y contenido' },
                  { step: '2 → 3', desc: 'Trust Fortress: El prospecto te investiga y confía → Convierte mejor' },
                  { step: '3 → 4', desc: 'Activación: El usuario experimenta valor → Se activa y refiere' },
                  { step: '4 → 5', desc: 'Referidos: Crecimiento orgánico → Más datos para attribution' },
                  { step: '5 → 1', desc: 'Attribution: Mides qué funciona → Optimizas todos los bloques → Loop' },
                ].map(({ step, desc }) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="font-black text-[#6351d5] text-xs bg-[#6351d5]/10 px-2 py-1 rounded-md flex-shrink-0 mt-0.5">{step}</span>
                    {desc}
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-xl p-4">
                <p className="text-[#6351d5] font-bold text-sm">
                  Cada vuelta del flywheel es mejor que la anterior. Más reviews, mejor activación, más referidos, mejor attribution, mejores decisiones. Eso es compounding.
                </p>
              </div>
            </section>

            {/* ── PARTE 4: CASO REAL ────────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">4</div>
                <h2 className="text-2xl font-black text-[#032149]">Caso Real — De Tácticas a Sistema</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">250K€/mes en paid — sin flywheel, sin compounding</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="font-bold text-red-700 text-sm mb-3">Antes: El Modo Tácticas</h3>
                  <div className="space-y-1.5">
                    {[
                      'CAC alto y subiendo cada trimestre',
                      'Sin attribution real — no sabían qué activaba usuarios',
                      'Cero referidos productizados',
                      'Pocas reviews, nota baja',
                      'Equipo en modo "campaña del mes"',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-red-700">
                        <span className="flex-shrink-0 mt-0.5">✕</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h3 className="font-bold text-emerald-700 text-sm mb-3">Después: El Modo Sistema</h3>
                  <div className="space-y-1.5">
                    {[
                      'Waterholes: objeción #1 era "es caro" (cuando era más barato)',
                      'Trust Fortress + contenido transparente sobre pricing real',
                      'Activación rediseñada: valor en menos de 10 minutos',
                      'Referidos con doble incentivo → usuarios activos = canal',
                      'Dashboard semanal con CAR → redistribución de presupuesto',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                        <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'CAC', value: '-70%', sub: 'sin reducir volumen' },
                  { label: 'LTV', value: 'x2', sub: 'mejores usuarios' },
                  { label: 'Flywheel', value: '✓', sub: 'los canales se retroalimentaban' },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-[#6351d5]/5 border border-[#6351d5]/20 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-2xl font-black text-[#6351d5]">{value}</p>
                    <p className="text-xs text-slate-500 mt-1">{sub}</p>
                  </div>
                ))}
              </div>

              <blockquote className="bg-slate-50 border-l-4 border-[#6351d5] pl-5 py-3 pr-4 rounded-r-xl text-sm text-slate-600 italic">
                Las reviews mejoraban la conversión de ads. La mejor activación generaba más referidos. Los referidos traían usuarios de mejor calidad. El flywheel giraba solo.
              </blockquote>
            </section>

            {/* ── PARTE 5: DIAGNÓSTICO ──────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">5</div>
                <h2 className="text-2xl font-black text-[#032149]">Diagnóstico — ¿Tienes un Sistema o Solo Tácticas?</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 ml-11">Marca cada punto que aplica a tu situación</p>

              {[
                {
                  block: 'Conexión', color: 'blue',
                  items: [
                    '¿Tus acciones de marketing están conectadas entre sí? (la acción A alimenta a la B)',
                    '¿Una acción completada mejora automáticamente la siguiente?',
                    '¿Puedes explicar tu flywheel en 30 segundos?',
                  ],
                },
                {
                  block: 'Autonomía', color: 'violet',
                  items: [
                    '¿Si desapareces 2 semanas, el growth sigue funcionando?',
                    '¿Tu sistema funciona sin depender de una persona específica?',
                    '¿Tienes procesos documentados (no solo en la cabeza del fundador)?',
                  ],
                },
                {
                  block: 'Medición', color: 'amber',
                  items: [
                    '¿Mides activaciones por canal (no solo registros)?',
                    '¿Tienes un ritual semanal de revisión de métricas?',
                    '¿Sabes cuál es tu CAR (Customer Activation Rate)?',
                  ],
                },
                {
                  block: 'Compounding', color: 'green',
                  items: [
                    '¿Tu CAC mejora con el tiempo (no empeora)?',
                    '¿Los referidos son un canal activo (no accidental)?',
                    '¿Reutilizas aprendizajes de un canal en otros?',
                  ],
                },
              ].map(({ block, color, items }) => (
                <div key={block} className={`bg-${color}-50/40 border border-${color}-100 rounded-2xl p-5 mb-4`}>
                  <p className={`font-bold text-${color}-700 text-xs uppercase tracking-wide mb-3`}>{block}</p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <ChecklistItem key={i} text={item} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {[
                  { score: '0-3 Sí', label: 'Tácticas puras', color: 'red', desc: 'Cada acción empieza de cero' },
                  { score: '4-6 Sí', label: 'Proto-sistema', color: 'amber', desc: 'Piezas sin conectar' },
                  { score: '7-9 Sí', label: 'Sistema en formación', color: 'blue', desc: 'Base lista, optimiza' },
                  { score: '10-12 Sí', label: 'Sistema real', color: 'emerald', desc: 'Tu flywheel compone' },
                ].map(({ score, label, color, desc }) => (
                  <div key={score} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-3 text-center`}>
                    <p className={`text-${color}-700 font-black text-sm`}>{score}</p>
                    <p className={`text-${color}-800 font-semibold text-xs mt-1`}>{label}</p>
                    <p className={`text-${color}-600 text-xs mt-0.5`}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PARTE 6: PLAN 30 DÍAS ─────────────────────────────────── */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#6351d5] rounded-lg flex items-center justify-center text-white text-xs font-black">6</div>
                <h2 className="text-2xl font-black text-[#032149]">Plan de Acción — De Tácticas a Sistema en 30 Días</h2>
              </div>

              <div className="space-y-4 mt-6">
                {[
                  {
                    week: 'Semana 1', title: 'Mapeo y Diagnóstico', color: 'blue',
                    items: [
                      'Completa el diagnóstico de 12 preguntas de arriba',
                      'Lista todas las acciones de marketing que haces actualmente',
                      'Para cada acción, pregunta: ¿alimenta a otra acción? ¿O muere sola?',
                      'Identifica tus 5 waterholes principales',
                    ],
                  },
                  {
                    week: 'Semana 2', title: 'Diseña los 5 Bloques', color: 'violet',
                    items: [
                      'Bloque 1: Haz tu primera sesión de 1h en waterholes. Anota las 3 objeciones principales',
                      'Bloque 2: Audita tu Trust Fortress (reviews, Google, IAs)',
                      'Bloque 3: Define tu momento aha y mapea los pasos actuales',
                      'Bloque 4: Diseña un programa de referidos Nivel 1 (simple)',
                      'Bloque 5: Crea un dashboard mínimo con CAR por canal',
                    ],
                  },
                  {
                    week: 'Semana 3', title: 'Conecta los Bloques', color: 'amber',
                    items: [
                      'Usa los insights de waterholes para mejorar tu messaging',
                      'Contacta a 10 clientes para activar reviews (Trust Fortress)',
                      'Simplifica tu onboarding: elimina cada paso no esencial',
                      'Lanza el programa de referidos con tu base activa',
                    ],
                  },
                  {
                    week: 'Semana 4', title: 'Activa el Flywheel', color: 'emerald',
                    items: [
                      'Revisa el dashboard: ¿qué canales tienen mejor CAR?',
                      'Redistribuye 20% del presupuesto hacia los mejores canales',
                      'Establece el ritual semanal: 15 min cada viernes',
                      'Documenta: ¿qué aprendiste? ¿qué cambiarías?',
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
                <h2 className="text-2xl font-black text-[#032149]">Las 5 Reglas del Sistema de Growth</h2>
              </div>
              <div className="space-y-3">
                {[
                  { num: '1', rule: 'Tácticas son flechas. Sistemas son ruedas.', desc: 'Una flecha va en una dirección y cae. Una rueda gira y cada vuelta es más fácil. Construye ruedas, no flechas.' },
                  { num: '2', rule: 'Si no se conecta, no compone.', desc: 'La mejor campaña del mundo no vale nada si su resultado no alimenta a la siguiente acción. Antes de lanzar algo, pregunta: ¿esto alimenta otro bloque?' },
                  { num: '3', rule: 'Mide lo que compone, no lo que impresiona.', desc: 'Registros impresionan. Activaciones componen. Seguidores impresionan. Referidos componen.' },
                  { num: '4', rule: 'El sistema más simple que funciona > el más completo que no se implementa.', desc: 'No necesitas los 5 bloques perfectos el día 1. Necesitas los 5 bloques funcionando al nivel mínimo. Luego iteras.' },
                  { num: '5', rule: 'Campañas mueren. Sistemas componen.', desc: 'Una campaña tiene fecha de caducidad. Un sistema de trust, activación y referidos sigue generando resultados mientras exista.' },
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
                  "La diferencia entre una empresa que escala y una que sobrevive no es el presupuesto. Es si lo que hace se conecta, se retroalimenta y compone. Cada acción suelta es energía perdida. Cada acción conectada es un ladrillo en tu máquina."
                </p>
              </blockquote>
            </section>

            {/* ── CTA FINAL ───────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres construir tu sistema de growth?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Trabajamos con empresas tech B2B y B2C para conectar sus tácticas en un sistema que compone. Agenda una llamada para ver si hay fit.
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

function SystemBlock({ num, title, icon, color, children }: {
  num: string; title: string; icon: React.ReactNode; color: string; children: React.ReactNode;
}) {
  return (
    <div className={`bg-${color}-50/40 border border-${color}-100 rounded-2xl p-6 mb-4`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 bg-${color}-100 text-${color}-700 rounded-lg flex items-center justify-center flex-shrink-0`}>
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

function ChecklistItem({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-white/60 ${checked ? 'opacity-60' : ''}`}
      onClick={() => setChecked(v => !v)}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
        {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-sm leading-relaxed ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {text}
      </span>
    </div>
  );
}
