'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Trophy } from 'lucide-react';
import { translations, BOOKING_LINK } from '@/lib/translations';
import type { CaseStudy } from '@/lib/firebase';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

interface CasosPageClientProps {
  caseStudies: CaseStudy[];
}

export default function CasosPageClient({ caseStudies }: CasosPageClientProps) {
  const [lang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
      <CookieBanner />

      {/* Floating Nav - same style as blog */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
        <nav className="nav-island w-full max-w-6xl">
          <div className="px-6 sm:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-0 cursor-pointer group flex-shrink-0">
                <img
                  src="https://i.imgur.com/imHxGWI.png"
                  alt="Growth4U Logo"
                  className="h-5 md:h-6 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  Home
                </Link>
                <Link href="/blog" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  Blog
                </Link>
                <span className="text-[#6351d5] px-2 py-2 rounded-md text-sm font-bold">Casos de Éxito</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-bold text-sm mb-4 border border-amber-100">
              <Trophy className="w-4 h-4 inline mr-2 -mt-0.5" />
              RESULTADOS AUDITADOS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#032149] mb-6">
              Casos de <span className="text-[#6351d5]">Éxito</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubre cómo hemos ayudado a fintechs líderes a reducir su CAC, escalar usuarios y construir activos de crecimiento duraderos.
            </p>
          </div>

          {/* Case Studies Grid */}
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <Link
                  key={caseStudy.id || index}
                  href={`/casos-de-exito/${caseStudy.slug}/`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                >
                  {/* Image/Header */}
                  <div className="relative aspect-video bg-gradient-to-br from-[#6351d5] to-[#3f45fe] overflow-hidden">
                    {caseStudy.image ? (
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.company}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black text-white/90">{caseStudy.company}</span>
                      </div>
                    )}
                    {/* Stat Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-slate-100">
                      <div className="text-2xl font-black text-[#6351d5] leading-none">{caseStudy.stat}</div>
                      <div className="text-xs font-medium text-slate-600">{caseStudy.statLabel}</div>
                    </div>
                    {/* Company Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#032149] uppercase tracking-wide border border-slate-200 shadow-sm">
                      {caseStudy.company}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm font-semibold text-[#6351d5] mb-2">{caseStudy.highlight}</p>
                    <h3 className="text-lg font-bold mb-3 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">
                      {caseStudy.summary}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-50">
                      <div className="flex items-center text-slate-500">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        Caso verificado
                      </div>
                      <span className="text-[#6351d5] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ver caso <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Próximamente</h2>
              <p className="text-slate-500">Estamos preparando casos de éxito detallados.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6351d5] to-[#3f45fe] mx-4 rounded-3xl mb-8 max-w-7xl lg:mx-auto">
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#6351d5] font-bold rounded-full hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            Agendar Llamada <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}
