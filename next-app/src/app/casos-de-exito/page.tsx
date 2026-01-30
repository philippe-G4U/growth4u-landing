import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getAllCaseStudies } from '@/lib/firebase';
import { BOOKING_LINK } from '@/lib/translations';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Growth4U',
  description: 'Descubre cómo hemos ayudado a fintechs como Bnext, Bit2Me y GoCardless a escalar su crecimiento con resultados medibles.',
  alternates: {
    canonical: '/casos-de-exito',
  },
  openGraph: {
    title: 'Casos de Éxito | Growth4U',
    description: 'Resultados reales de fintechs que han escalado con el Trust Engine.',
    type: 'website',
  },
};

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function CasosDeExitoPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
      <CookieBanner />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-[#6351d5] transition-colors">
              Blog
            </Link>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#6351d5] text-white text-sm font-bold rounded-full hover:bg-[#5242b8] transition-colors"
            >
              Agendar Llamada
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#6351d5]/10 text-[#6351d5] rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            Casos de Éxito
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#032149] leading-tight">
            Resultados que hablan <span className="text-[#6351d5]">por sí solos</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Descubre cómo hemos ayudado a fintechs líderes a reducir su CAC, escalar usuarios y construir activos de crecimiento duraderos.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.id}
                  href={`/casos-de-exito/${caseStudy.slug}/`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {caseStudy.image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#6351d5] to-[#3f45fe] flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{caseStudy.company}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                      {caseStudy.company}
                    </div>
                    <div className="mb-4">
                      <div className="text-4xl font-extrabold text-[#6351d5]">{caseStudy.stat}</div>
                      <div className="text-slate-700 font-medium">{caseStudy.statLabel}</div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{caseStudy.summary}</p>
                    <div className="flex items-center text-[#6351d5] font-bold text-sm group-hover:gap-2 transition-all">
                      Leer caso completo <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Próximamente</h2>
              <p className="text-slate-500">Estamos preparando casos de éxito detallados.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#6351d5] to-[#3f45fe]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Quieres ser el próximo caso de éxito?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Agenda una llamada y descubre cómo podemos ayudarte a escalar tu fintech.
          </p>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#6351d5] font-bold rounded-full hover:bg-slate-100 transition-colors shadow-lg"
          >
            Agendar Llamada <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#032149] text-white/60 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2025 Growth4U. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
