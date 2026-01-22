import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Cookie,
  Layers,
  Settings,
  RefreshCw,
  Smartphone,
  ExternalLink,
  BarChart3,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Consulta nuestra Política de Cookies para conocer cómo gestionamos las cookies en Growth4U.',
  alternates: {
    canonical: '/cookies',
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

export default function CookiesPage() {
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
              <Cookie className="w-8 h-8 text-[#6351d5]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#032149] mb-4">Política de Cookies</h1>
            <p className="text-slate-500 text-sm">Última actualización: Enero 2025</p>
          </div>

          <div className="text-slate-600 leading-relaxed">
            <Section number="2.1" title="¿Qué son las cookies?" icon={Cookie}>
              <p className="mb-4">
                Las cookies son pequeños archivos de texto que se descargan en tu dispositivo (ordenador, tablet, smartphone, etc.)
                cuando visitas determinadas páginas web. Permiten, entre otras cosas:
              </p>
              <BulletList
                items={[
                  <>Que la web funcione correctamente.</>,
                  <>Recordar tus preferencias de navegación.</>,
                  <>Obtener información estadística anónima sobre el uso del sitio.</>,
                  <>Mostrarte contenidos y anuncios más acordes con tus intereses.</>,
                ]}
              />
            </Section>

            <Section number="2.2" title="Tipos de cookies que utilizamos" icon={Layers}>
              <p className="mb-6">En la web de Growth4U podemos utilizar:</p>

              <div className="space-y-4 mb-8">
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <h4 className="font-bold text-emerald-800">Cookies técnicas o necesarias</h4>
                  </div>
                  <p className="text-sm text-emerald-700">
                    Imprescindibles para que la web funcione (gestión de sesiones, seguridad, carga de página, recordar el
                    consentimiento de cookies, etc.). <strong>No requieren tu consentimiento.</strong>
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <h4 className="font-bold text-blue-800">Cookies de preferencias o personalización</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Permiten recordar elecciones como el idioma, la región u otras configuraciones para mejorar tu experiencia.
                    Algunas pueden requerir consentimiento según la configuración concreta.
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <h4 className="font-bold text-purple-800">Cookies de análisis o medición</h4>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">
                    Nos ayudan a entender cómo se usa la web (páginas más visitadas, tiempo de permanencia, fuentes de tráfico, etc.)
                    para mejorarla.
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <h4 className="font-bold text-orange-800">Cookies de marketing o publicidad comportamental</h4>
                  </div>
                  <p className="text-sm text-orange-700">
                    Permiten mostrarte anuncios en función de tus hábitos de navegación y crear perfiles comerciales.{' '}
                    <strong>Solo se instalarán si prestas tu consentimiento expreso.</strong>
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-[#032149] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> Tabla de cookies vigentes
              </h4>
              <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-[#032149]">
                      <tr>
                        <th className="p-4 font-bold">Nombre</th>
                        <th className="p-4 font-bold">Proveedor</th>
                        <th className="p-4 font-bold">Finalidad</th>
                        <th className="p-4 font-bold">Duración</th>
                        <th className="p-4 font-bold">Categoría</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="p-4 font-mono text-xs text-slate-600">msgsndr_session</td>
                        <td className="p-4 text-slate-600">GoHighLevel</td>
                        <td className="p-4 text-slate-600">Gestión de sesión del usuario en la web y formularios</td>
                        <td className="p-4 text-slate-600">Sesión</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Técnica</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-slate-600">__cf_bm</td>
                        <td className="p-4 text-slate-600">Cloudflare</td>
                        <td className="p-4 text-slate-600">Filtra tráfico para evitar ataques de bots (seguridad)</td>
                        <td className="p-4 text-slate-600">30 min</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Seguridad</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-slate-600">ghl_consent</td>
                        <td className="p-4 text-slate-600">GoHighLevel</td>
                        <td className="p-4 text-slate-600">Almacena tu elección sobre el uso de cookies</td>
                        <td className="p-4 text-slate-600">1 año</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">Técnica</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-slate-600">_fbp</td>
                        <td className="p-4 text-slate-600">Meta</td>
                        <td className="p-4 text-slate-600">Publicidad y retargeting</td>
                        <td className="p-4 text-slate-600">3 meses</td>
                        <td className="p-4">
                          <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold">Marketing</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            <Section number="2.3" title="Gestión del consentimiento de cookies" icon={Settings}>
              <p className="mb-4">
                Al acceder por primera vez a la web, se mostrará un <strong className="text-[#032149]">banner de cookies</strong> que
                te permitirá:
              </p>
              <BulletList
                className="mb-6"
                items={[
                  <>Aceptar todas las cookies opcionales.</>,
                  <>Rechazar todas las cookies opcionales con una acción tan sencilla como aceptarlas.</>,
                  <>Configurar tus preferencias por categoría (analítica, marketing, etc.).</>,
                ]}
              />

              <InfoBox variant="success">
                <strong>Hasta que no aceptes o configures las cookies opcionales:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• No se activarán las cookies que no sean técnicas o necesarias.</li>
                  <li>• Solo se utilizarán las cookies imprescindibles para el funcionamiento básico del sitio.</li>
                </ul>
              </InfoBox>
            </Section>

            <Section number="2.4" title="Cambiar o retirar el consentimiento" icon={RefreshCw}>
              <p className="mb-4">
                Puedes modificar tu configuración de cookies o retirar tu consentimiento en cualquier momento mediante:
              </p>
              <BulletList
                items={[
                  <>
                    El enlace "<strong className="text-[#032149]">Configurar cookies</strong>" o similar disponible en el pie de
                    página de la web.
                  </>,
                  <>La limpieza de cookies desde la configuración de tu navegador.</>,
                ]}
              />
              <p className="mt-4">
                Los cambios que realices se aplicarán de forma inmediata o en tu siguiente navegación por el sitio.
              </p>
            </Section>

            <Section number="2.5" title="Cómo desactivar o eliminar cookies desde el navegador" icon={Smartphone}>
              <p className="mb-4">Además del panel de configuración de la web, puedes configurar tu navegador para:</p>
              <BulletList
                className="mb-6"
                items={[
                  <>Bloquear o eliminar cookies ya instaladas.</>,
                  <>Recibir avisos antes de que se almacenen nuevas cookies.</>,
                ]}
              />

              <p className="mb-4">
                Los pasos concretos dependen del navegador que utilices. Aquí tienes enlaces a la ayuda de los navegadores más
                comunes:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                  { name: 'Firefox', url: 'https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-' },
                  { name: 'Safari', url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
                  {
                    name: 'Edge',
                    url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
                  },
                ].map((browser, i) => (
                  <a
                    key={i}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#6351d5] hover:bg-[#6351d5]/5 transition-all group"
                  >
                    <span className="font-semibold text-[#032149] group-hover:text-[#6351d5]">{browser.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#6351d5]" />
                  </a>
                ))}
              </div>

              <InfoBox variant="warning">
                <strong>Ten en cuenta:</strong> Si bloqueas todas las cookies, es posible que algunas funciones o servicios del sitio
                web no se muestren o no funcionen correctamente.
              </InfoBox>
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
