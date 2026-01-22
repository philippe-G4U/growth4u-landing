import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Scale,
  Building2,
  Database,
  Globe,
  Target,
  Lock,
  Users,
  Clock,
  UserCheck,
  FileText,
  Mail,
  CheckCircle,
  Briefcase,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Consulta nuestra Política de Privacidad para conocer cómo gestionamos tus datos en Growth4U.',
  alternates: {
    canonical: '/privacidad',
  },
};

function Section({
  number,
  title,
  children,
  icon: Icon,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="bg-[#6351d5]/10 p-2.5 rounded-xl">
            <Icon className="w-5 h-5 text-[#6351d5]" />
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-[#032149]">
          {number}. {title}
        </h3>
      </div>
      <div className="pl-0 md:pl-12">{children}</div>
    </div>
  );
}

function BulletList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6351d5] mt-2.5 flex-shrink-0" />
          <span className="text-slate-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  return <div className={`p-4 rounded-xl border ${styles[variant]} text-sm leading-relaxed`}>{children}</div>;
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver a Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-12 pb-8 border-b border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6351d5]/10 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-[#6351d5]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#032149] mb-4">Política de Privacidad</h1>
            <p className="text-slate-500 text-sm">Última actualización: Enero 2025</p>
          </div>

          <div className="text-slate-600 leading-relaxed">
            <div className="bg-gradient-to-br from-[#effcfd] to-[#f0f4ff] p-8 rounded-2xl mb-12 border border-[#0faec1]/20">
              <h3 className="text-[#032149] font-bold text-lg mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#0faec1]" />
                Resumen Ejecutivo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responsable</span>
                  <p className="text-[#032149] font-semibold mt-1">Growth Systems Now, S.L. ("Growth4U")</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Finalidad</span>
                  <p className="text-[#032149] font-semibold mt-1">Gestión de consultas, servicios, marketing B2B y análisis</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legitimación</span>
                  <p className="text-[#032149] font-semibold mt-1">Contrato, interés legítimo y consentimiento</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Derechos</span>
                  <p className="text-[#032149] font-semibold mt-1">Acceso, rectificación, supresión, entre otros</p>
                </div>
              </div>
            </div>

            <Section number="1.1" title="Normativa aplicable" icon={Scale}>
              <p className="mb-4">Esta política se adapta a las siguientes normas:</p>
              <BulletList
                items={[
                  <>
                    <strong className="text-[#032149]">Reglamento (UE) 2016/679</strong> del Parlamento Europeo y del Consejo, de 27 de
                    abril de 2016 (RGPD).
                  </>,
                  <>
                    <strong className="text-[#032149]">Ley Orgánica 3/2018</strong>, de 5 de diciembre, de Protección de Datos
                    Personales y garantía de los derechos digitales (LOPDGDD).
                  </>,
                  <>Demás normativa española que resulte aplicable en materia de protección de datos y servicios de la sociedad de la información.</>,
                ]}
              />
            </Section>

            <Section number="1.2" title="Responsable del tratamiento" icon={Building2}>
              <p className="mb-4">El responsable del tratamiento de los datos personales es:</p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responsable</span>
                    <p className="text-[#032149] font-semibold mt-1">Growth Systems Now, S.L. ("Growth4U")</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NIF/CIF</span>
                    <p className="text-[#032149] font-semibold mt-1">ESB22671879</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domicilio postal</span>
                    <p className="text-[#032149] font-semibold mt-1">Calle de Luchana, 28, 2º A, 28010, Madrid, España</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contacto privacidad</span>
                    <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold hover:underline block mt-1">
                      privacidad@growth4u.io
                    </a>
                  </div>
                </div>
              </div>
              <InfoBox variant="info">
                Dada la naturaleza de nuestra actividad, Growth4U no está obligada al nombramiento de un Delegado de Protección de
                Datos. No obstante, para cualquier consulta puede dirigirse al correo electrónico indicado.
              </InfoBox>
            </Section>

            <Section number="1.3" title="Datos que tratamos" icon={Database}>
              <p className="mb-4">
                Podemos tratar las siguientes categorías de datos personales, según el formulario o canal que utilices:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-4 h-4 text-[#6351d5]" />
                    <span className="font-bold text-[#032149]">Datos identificativos</span>
                  </div>
                  <p className="text-sm text-slate-600">Nombre, apellidos</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[#6351d5]" />
                    <span className="font-bold text-[#032149]">Datos de contacto</span>
                  </div>
                  <p className="text-sm text-slate-600">Correo electrónico, teléfono</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-[#6351d5]" />
                    <span className="font-bold text-[#032149]">Datos profesionales</span>
                  </div>
                  <p className="text-sm text-slate-600">Empresa, cargo, sector</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-[#6351d5]" />
                    <span className="font-bold text-[#032149]">Datos de uso</span>
                  </div>
                  <p className="text-sm text-slate-600">Interacción con emails, web, formularios, campañas</p>
                </div>
              </div>
              <InfoBox variant="warning">
                <strong>Nota:</strong> No solicitamos ni tratamos de forma intencionada{' '}
                <strong>categorías especiales de datos</strong> (salud, ideología, religión, etc.). Si excepcionalmente fuera
                necesario, se te informaría de forma específica y se recabaría el consentimiento expreso correspondiente.
              </InfoBox>
            </Section>

            <Section number="1.4" title="Finalidades del tratamiento" icon={Target}>
              <p className="mb-4">Usamos tus datos para:</p>
              <BulletList
                items={[
                  <>
                    <strong className="text-[#032149]">Gestión de consultas y reuniones:</strong> atender solicitudes de información,
                    demos o reuniones que nos plantees.
                  </>,
                  <>
                    <strong className="text-[#032149]">Prestación de servicios:</strong> gestionar la relación contractual, la
                    facturación y el soporte cuando seas cliente.
                  </>,
                  <>
                    <strong className="text-[#032149]">Comunicaciones comerciales B2B:</strong> enviarte comunicaciones relacionadas
                    con nuestros servicios de growth, estrategia GTM, contenidos formativos y recursos que puedan ser de tu interés
                    profesional.
                  </>,
                  <>
                    <strong className="text-[#032149]">Publicidad y Retargeting:</strong> Utilizamos el Píxel de Meta para medir la
                    eficacia de nuestras campañas publicitarias y mostrar anuncios relevantes a personas que han interactuado con
                    nuestros formularios o página web.
                  </>,
                  <>
                    <strong className="text-[#032149]">Mejora de servicios y analítica interna:</strong> realizar análisis agregados y
                    estadísticos sobre el uso de nuestra web, materiales descargados y campañas, con el fin de mejorar nuestros
                    contenidos y propuestas de valor.
                  </>,
                ]}
              />
            </Section>

            <Section number="1.5" title="Medidas de seguridad" icon={Lock}>
              <p className="mb-4">
                Growth4U aplica medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo,
                de acuerdo con el art. 32 RGPD, incluyendo, entre otras:
              </p>
              <BulletList
                items={[
                  <>Control de accesos y gestión de permisos según rol.</>,
                  <>Uso de proveedores con cifrado en tránsito y, cuando es posible, en reposo.</>,
                  <>Políticas internas de contraseña y autenticación reforzada.</>,
                  <>Copias de seguridad periódicas y procedimientos de restauración.</>,
                  <>Procedimientos para la gestión de incidentes de seguridad y brechas de datos.</>,
                ]}
              />
            </Section>

            <Section number="1.6" title="Destinatarios" icon={Users}>
              <p className="mb-4">
                Podemos compartir tus datos con terceros únicamente cuando sea necesario para la correcta prestación de nuestros
                servicios o por obligación legal.
              </p>
              <h4 className="font-bold text-[#032149] mb-4">Plataformas principales:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { name: 'GoHighLevel', desc: 'CRM, funnels y base de datos' },
                  { name: 'Instantly & MailScale', desc: 'Automatización y envío de emails' },
                  { name: 'Ulinc', desc: 'Gestión de outreach en LinkedIn' },
                  { name: 'Meta Platforms, Inc.', desc: 'Publicidad y análisis' },
                ].map((platform, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <div>
                      <span className="font-bold text-[#032149] text-sm">{platform.name}</span>
                      <p className="text-xs text-slate-500">{platform.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section number="1.7" title="Plazos de conservación" icon={Clock}>
              <p className="mb-4">Conservaremos tus datos:</p>
              <BulletList
                items={[
                  <>Mientras exista una relación comercial o contractual activa contigo o con tu empresa.</>,
                  <>Mientras sean necesarios para la finalidad para la que fueron recogidos.</>,
                  <>
                    Posteriormente, durante los plazos necesarios para cumplir obligaciones legales o para la{' '}
                    <strong className="text-[#032149]">prescripción de responsabilidades</strong> (por ejemplo, en materia civil,
                    fiscal o mercantil).
                  </>,
                ]}
              />
            </Section>

            <Section number="1.8" title="Derechos de los interesados" icon={UserCheck}>
              <p className="mb-6">Puedes ejercer en cualquier momento los siguientes derechos:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  { name: 'Acceso', desc: 'Saber qué datos tuyos tratamos' },
                  { name: 'Rectificación', desc: 'Solicitar la corrección de datos inexactos' },
                  { name: 'Supresión', desc: 'Pedir la eliminación de tus datos' },
                  { name: 'Limitación', desc: 'Limitar el tratamiento en ciertas circunstancias' },
                  { name: 'Portabilidad', desc: 'Recibir tus datos en formato estructurado' },
                  { name: 'Oposición', desc: 'Oponerte al tratamiento basado en interés legítimo' },
                ].map((right, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#032149]">{right.name}</span>
                      <p className="text-sm text-slate-600">{right.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#6351d5]/5 p-6 rounded-2xl border border-[#6351d5]/20 mb-6">
                <h4 className="font-bold text-[#032149] mb-4">Para ejercer tus derechos:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#6351d5]" />
                    <div>
                      <span className="text-sm text-slate-500">Email:</span>
                      <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold ml-2 hover:underline">
                        privacidad@growth4u.io
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                ¿Tienes dudas? Contacta con nosotros en{' '}
                <a href="mailto:privacidad@growth4u.io" className="text-[#6351d5] font-bold hover:underline">
                  privacidad@growth4u.io
                </a>
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" /> Volver a Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
