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
  Bot,
  FileText,
  LayoutDashboard,
  Play,
  Package,
  Clock,
  AlertCircle,
} from 'lucide-react';

const STORAGE_KEY = 'lm_kit_liberacion_unlocked';

const RESOURCES = [
  {
    num: '01',
    icon: <LayoutDashboard className="w-5 h-5" />,
    color: 'violet',
    title: 'Template Notion de Growth4U',
    subtitle: 'Sistema operativo real — duplicable',
    desc: 'El template exacto que usamos para gestionar 4 clientes con 3 personas. Dashboard, tareas, meeting notes, Context Lake y rituales pre-cargados.',
    saves: 'Ahorra: 5h/semana en coordinación y seguimiento',
  },
  {
    num: '02',
    icon: <Bot className="w-5 h-5" />,
    color: 'blue',
    title: '5 Agentes IA que Reemplazan 5 Roles',
    subtitle: 'Guía PDF — 3 páginas',
    desc: 'Los agentes exactos que usamos: Reportes, Waterholes, Follow-up, Content Mining y Dashboard. Para cada uno: qué hace, cómo lo montamos, cuánto tiempo ahorra.',
    saves: 'Ahorra: 10h/semana recuperadas sin contratar',
  },
  {
    num: '03',
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'amber',
    title: '¿Eres el Cuello de Botella?',
    subtitle: 'Checklist PDF — 1 página',
    desc: '10 señales de que eres el cuello de botella + cómo desbloquear cada una. Desde "eres la última decisión en todo" hasta "no puedes irte de vacaciones".',
    saves: 'Diagnóstico honesto en 5 minutos',
  },
  {
    num: '04',
    icon: <FileText className="w-5 h-5" />,
    color: 'emerald',
    title: 'Playbook Automatización Operativa',
    subtitle: '30 días — PDF 4 páginas',
    desc: 'De apagar fuegos a sistema que corre solo: semana 1 auditoría, semana 2 quick wins, semana 3 documentar, semana 4 ritualizar.',
    saves: 'Plan concreto semana a semana',
  },
  {
    num: '05',
    icon: <Play className="w-5 h-5" />,
    color: 'red',
    title: 'Video Demo del Sistema',
    subtitle: 'Screen recording — 3 min',
    desc: 'Recorrido por el Notion real de Growth4U con 4 clientes activos. Cómo un agente IA genera un reporte semanal. Cómo funciona el Context Lake en la práctica.',
    saves: 'Ver el sistema en acción, no en teoría',
  },
];

export default function KitDeLiberacionPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bottleneck) { setError('Por favor selecciona tu cuello de botella principal.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await saveLeadMagnetLead({
        name, email,
        company: phone, // reusing company field for phone
        leadMagnet: `kit-de-liberacion|phone:${phone}|bottleneck:${bottleneck}`,
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
              <Package className="w-3.5 h-3.5" /> Kit Gratuito · 5 Recursos Descargables
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Operar como un equipo 10x<br />
              <span className="text-[#45b6f7]">sin contratar a 10 personas.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Equipo pequeño, sobrecargado, apagando fuegos. El CEO hace marketing, ventas, producto y operaciones.
              <strong className="text-white"> Si tu sistema de growth depende de ti, no tienes un sistema.</strong>
            </p>
          </div>
        </section>

        {/* ── PROOF ──────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#032149] rounded-xl flex items-center justify-center">
                <span className="text-white text-xs font-black">G4U</span>
              </div>
              <div>
                <p className="font-bold text-[#032149]">Growth4U opera así</p>
                <p className="text-slate-500 text-sm">Sistema real, no teórico</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '4', label: 'clientes activos' },
                { value: '3', label: 'personas en el equipo' },
                { value: '10h', label: 'ahorradas/semana con IA' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-black text-[#6351d5]">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mt-4 border-t border-slate-200 pt-4">
              Sin burnout. Sin caos. Sin el founder haciendo todo. El secreto no es trabajar más — es sistematizar mejor.
            </p>
          </div>

          {/* Resource pack preview */}
          <h2 className="text-xl font-bold text-[#032149] mb-2 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#6351d5]" />
            El Kit de Liberación — 5 recursos
          </h2>
          <p className="text-slate-500 text-sm mb-6">Todo lo que necesitas para dejar de ser el cuello de botella</p>

          <div className="space-y-3 mb-10">
            {RESOURCES.map(({ num, icon, color, title, subtitle }) => (
              <div key={num} className={`flex items-center gap-4 p-4 bg-${color}-50/60 border border-${color}-100 rounded-xl`}>
                <div className={`w-10 h-10 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {icon}
                </div>
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
                <h2 className="text-2xl md:text-3xl font-black mb-2">Descarga el kit completo</h2>
                <p className="text-white/70 mb-8 text-sm leading-relaxed">
                  Template Notion + Guía IA + Checklist + Playbook 30 días + Video Demo. Todo gratis.
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
                    <label className="block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">¿Cuál es tu mayor cuello de botella operativo? *</label>
                    <div className="space-y-2">
                      {[
                        { value: 'yo-hago-todo', label: 'Yo hago todo (marketing, ventas, producto, ops)' },
                        { value: 'equipo-depende', label: 'Tengo equipo pero dependen de mí para decidir' },
                        { value: 'sin-documentar', label: 'Los procesos no están documentados' },
                        { value: 'sin-automatizacion', label: 'No tenemos automatización, todo es manual' },
                      ].map(({ value, label }) => (
                        <label key={value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm ${bottleneck === value ? 'border-[#45b6f7] bg-white/15' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                          <input type="radio" name="bottleneck" value={value} checked={bottleneck === value} onChange={() => setBottleneck(value)} className="hidden" />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${bottleneck === value ? 'border-[#45b6f7]' : 'border-white/40'}`}>
                            {bottleneck === value && <div className="w-2 h-2 rounded-full bg-[#45b6f7]" />}
                          </div>
                          <span className="text-white/80">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] disabled:bg-slate-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm mt-2">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Desbloqueando...</> : <><Unlock className="w-4 h-4" /> Descargar el kit gratuito</>}
                  </button>
                  <p className="text-white/40 text-xs text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
                </form>
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
                <p className="font-bold text-emerald-800 text-sm">Kit desbloqueado — 5 recursos disponibles</p>
                <p className="text-emerald-700 text-xs">Guarda esta página en favoritos para acceder cuando quieras.</p>
              </div>
            </div>

            {/* Resources detailed */}
            <h2 className="text-2xl font-black text-[#032149] mb-6">Tus 5 Recursos</h2>
            <div className="space-y-8">

              {/* Resource 01 */}
              <ResourceCard num="01" icon={<LayoutDashboard className="w-5 h-5" />} color="violet"
                title="Template Notion de Growth4U" subtitle="Sistema operativo real — duplicable">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  El template exacto que usamos para gestionar 4 clientes con 3 personas. No es teórico — es el sistema operativo real de Growth4U, disponible para que lo dupliques en tu cuenta de Notion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {[
                    { t: 'Dashboard principal', d: 'Vista de todos los clientes con status, métricas y próximas acciones' },
                    { t: 'Sistema de tareas', d: 'Kanban con priorización automática por impacto/urgencia' },
                    { t: 'Meeting notes', d: 'Templates pre-cargados con action items asignables' },
                    { t: 'Context Lake', d: 'Base de conocimiento centralizada por cliente' },
                    { t: 'Rituales', d: 'Daily standup, weekly review, monthly retro — ya montados' },
                  ].map(({ t, d }) => (
                    <div key={t} className="bg-violet-50/60 border border-violet-100 rounded-lg p-3">
                      <p className="font-semibold text-[#032149] text-xs mb-0.5">{t}</p>
                      <p className="text-slate-500 text-xs">{d}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-violet-100 rounded-lg p-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-violet-600 flex-shrink-0" />
                  <p className="text-violet-800 text-xs font-semibold">Ahorra ~5h/semana en coordinación y seguimiento de clientes</p>
                </div>
                <div className="mt-4 bg-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-white/70 text-sm">Agenda una llamada y te enviamos el enlace de duplicado antes de que termine.</p>
                  <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2.5 px-5 rounded-full transition-all text-xs whitespace-nowrap flex-shrink-0">
                    Agendar llamada <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </ResourceCard>

              {/* Resource 02 */}
              <ResourceCard num="02" icon={<Bot className="w-5 h-5" />} color="blue"
                title="5 Agentes IA que Reemplazan 5 Roles" subtitle="Guía práctica — cómo los montamos nosotros">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Los agentes exactos que usamos en Growth4U. Para cada uno: qué hace, cómo lo montamos, cuánto tiempo ahorra y con qué herramientas.
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    { n: '1', title: 'Agente Reportes', role: 'reemplaza analista junior', desc: 'Genera reports semanales automáticos por cliente con métricas, highlights y recomendaciones. Input: datos de ads + analytics. Output: PDF listo para enviar.' },
                    { n: '2', title: 'Agente Waterholes', role: 'reemplaza research assistant', desc: 'Monitorea Reddit, foros, comparativas y reviews de competidores. Alerta cuando aparecen menciones relevantes. Resumen semanal automático.' },
                    { n: '3', title: 'Agente Follow-up', role: 'reemplaza SDR', desc: 'Secuencias de activación y nurturing personalizadas. Detecta usuarios que no se han activado y lanza el follow-up correcto en el momento correcto.' },
                    { n: '4', title: 'Agente Content Mining', role: 'reemplaza content manager', desc: 'Extrae insights de reuniones (transcripciones), documentos y convierte en borradores de contenido, resúmenes ejecutivos y action items.' },
                    { n: '5', title: 'Agente Dashboard', role: 'reemplaza data analyst', desc: 'Attribution y métricas actualizadas automáticamente. CAC por canal, CAR, LTV. Dashboard listo cada lunes sin intervención humana.' },
                  ].map(({ n, title, role, desc }) => (
                    <div key={n} className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-black flex items-center justify-center flex-shrink-0">{n}</span>
                        <div>
                          <span className="font-bold text-[#032149] text-sm">{title}</span>
                          <span className="text-blue-600 text-xs ml-2">— {role}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-100 rounded-lg p-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-800 text-xs font-semibold">10 horas/semana recuperadas. Sin contratar a nadie.</p>
                </div>
              </ResourceCard>

              {/* Resource 03 */}
              <ResourceCard num="03" icon={<AlertCircle className="w-5 h-5" />} color="amber"
                title="¿Eres el Cuello de Botella?" subtitle="10 señales + cómo desbloquear cada una">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Diagnóstico honesto en 5 minutos. Marca cada señal que aplica. Para cada una, la acción concreta para desbloquearte.
                </p>
                <div className="space-y-2">
                  {[
                    { signal: '¿Eres la última decisión en todo?', fix: 'Documentar criterios de decisión por tipo de situación' },
                    { signal: '¿Si te enfermas, todo se para?', fix: 'Crear SOPs para los 5 procesos más críticos' },
                    { signal: '¿Haces trabajo que podría automatizarse?', fix: 'Identificar los 3 procesos más repetitivos esta semana' },
                    { signal: '¿Tu equipo te pregunta todo?', fix: 'Crear Context Lake accesible sin necesitar preguntarte' },
                    { signal: '¿Trabajas más de 60h/semana?', fix: 'Priorizar: eliminar > delegar > automatizar > mantener' },
                    { signal: '¿No tienes tiempo para estrategia?', fix: 'Bloquear 2h/semana sagradas (en el calendario, no negociable)' },
                    { signal: '¿Los proyectos se atrasan esperándote?', fix: 'Asignar ownership claro con deadline y criterios de éxito' },
                    { signal: '¿Duplicas trabajo que ya hiciste antes?', fix: 'Templates y sistemas reutilizables para los 10 más comunes' },
                    { signal: '¿Tu onboarding de clientes depende de ti?', fix: 'Automatizar con IA: checklist + secuencia automática' },
                    { signal: '¿No puedes irte de vacaciones?', fix: 'Test: 1 semana sin ti. Anota qué se rompe. Arréglalo antes de irte.' },
                  ].map(({ signal, fix }, i) => (
                    <ChecklistItemWithFix key={i} signal={signal} fix={fix} num={i + 1} />
                  ))}
                </div>
              </ResourceCard>

              {/* Resource 04 */}
              <ResourceCard num="04" icon={<FileText className="w-5 h-5" />} color="emerald"
                title="Playbook Automatización Operativa" subtitle="Plan de 30 días — de apagar fuegos a sistema">
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Estructura semana a semana para pasar de "el founder hace todo" a "el sistema corre solo".
                </p>
                <div className="space-y-4">
                  {[
                    {
                      week: 'Semana 1', title: 'Auditoría', color: 'blue',
                      items: [
                        'Mapear dónde va tu tiempo durante 3 días (en bloques de 30 min)',
                        'Clasificar cada tarea: eliminar / delegar / automatizar / mantener',
                        'Identificar los 3 procesos que más tiempo consumen',
                        'Calcular el coste real de hacer tú lo que podría hacer otro',
                      ],
                    },
                    {
                      week: 'Semana 2', title: 'Quick Wins', color: 'amber',
                      items: [
                        'Automatizar los 3 procesos más repetitivos (n8n, Zapier, o agentes IA)',
                        'Montar el primer agente IA (empezar por Reportes — el de mayor impacto visible)',
                        'Crear templates para las respuestas más frecuentes',
                        'Delegar 1 tarea completa con SOP escrito en menos de 30 min',
                      ],
                    },
                    {
                      week: 'Semana 3', title: 'Documentar', color: 'violet',
                      items: [
                        'SOPs para los 5 procesos más críticos (máx. 1 página cada uno)',
                        'Crear Context Lake: toda la información que "está en tu cabeza" escrita',
                        'Onboarding de equipo: ¿cómo entienden el contexto sin preguntarte?',
                        'Criterios de decisión documentados: ¿qué aprobarías siempre sin verlo?',
                      ],
                    },
                    {
                      week: 'Semana 4', title: 'Ritualizar', color: 'emerald',
                      items: [
                        'Instalar daily standup de 15 min con agenda fija (sin improvisar)',
                        'Weekly review de 30 min: ¿qué falló? ¿qué automatizar la semana siguiente?',
                        'Monthly retro: ¿qué proceso nuevo puedo delegar o automatizar?',
                        'Test: desaparecer 1 día sin avisar. Ver qué se rompe. Arreglarlo.',
                      ],
                    },
                  ].map(({ week, title, color, items }) => (
                    <div key={week} className={`bg-${color}-50 border border-${color}-200 rounded-xl p-5`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className={`w-4 h-4 text-${color}-600`} />
                        <span className={`text-${color}-500 text-xs font-bold uppercase tracking-wide`}>{week}</span>
                        <span className="font-black text-[#032149] text-sm">— {title}</span>
                      </div>
                      <div className="space-y-1.5">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <div className={`w-3.5 h-3.5 border-2 border-${color}-400 rounded flex-shrink-0 mt-0.5`} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ResourceCard>

              {/* Resource 05 */}
              <ResourceCard num="05" icon={<Play className="w-5 h-5" />} color="red"
                title="Video Demo del Sistema" subtitle="Screen recording — 3 min — sistema en acción">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Ver el sistema en acción, no en teoría. Recorrido por el Notion real de Growth4U con 4 clientes activos.
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    'Dashboard principal con 4 clientes y sus métricas en tiempo real',
                    'Cómo el Agente Reportes genera un informe semanal completo en 2 minutos',
                    'Cómo funciona el Context Lake: toda la información, siempre accesible',
                    'El ritual de weekly review: 30 minutos que reemplazan 3 horas de reuniones',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <ChevronRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <Play className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-[#032149] text-sm">Solicitar acceso al video</p>
                    <p className="text-slate-500 text-xs mb-2">Agenda una llamada y te compartimos el screen recording durante la sesión.</p>
                    <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-4 rounded-full transition-all text-xs">
                      Agendar llamada <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </ResourceCard>
            </div>

            {/* CTA */}
            <section className="mt-16 bg-gradient-to-br from-[#032149] to-[#1a1060] rounded-3xl p-8 md:p-10 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-black mb-3">¿Quieres que implementemos el sistema juntos?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Puedes implementar esto solo con este kit — o podemos hacerlo contigo en 30 días. Agenda una llamada para ver si hay fit.
              </p>
              <a href="https://calendly.com/growth4u/consulta-estrategica" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-[#6351d5]/30 text-sm">
                Agendar diagnóstico operativo
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
    <div className={`border border-${color}-200 rounded-2xl overflow-hidden`}>
      <div className={`bg-${color}-50 px-6 py-4 flex items-center gap-4 border-b border-${color}-200`}>
        <div className={`w-10 h-10 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-${color}-500 text-xs font-black uppercase tracking-wide`}>Recurso {num}</span>
          </div>
          <h3 className="font-black text-[#032149] text-base">{title}</h3>
          <p className="text-slate-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ChecklistItemWithFix({ signal, fix, num }: { signal: string; fix: string; num: number }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`border border-slate-200 rounded-xl p-4 transition-colors ${checked ? 'bg-emerald-50 border-emerald-200' : 'bg-white hover:bg-slate-50'} cursor-pointer`}
      onClick={() => setChecked(v => !v)}>
      <div className="flex items-start gap-3">
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-amber-400'}`}>
          {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <span className="text-xs text-slate-400 font-bold flex-shrink-0 mt-0.5">{num}.</span>
            <p className={`text-sm font-semibold ${checked ? 'text-slate-400 line-through' : 'text-[#032149]'}`}>{signal}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-4">
            <span className="text-emerald-600 font-semibold">→ </span>{fix}
          </p>
        </div>
      </div>
    </div>
  );
}
