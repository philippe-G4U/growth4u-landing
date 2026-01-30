'use client';

import { ArrowRight } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import { BOOKING_LINK } from '@/lib/translations';

interface HeroSectionProps {
  t: TranslationSet;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const logos = ['bnext', 'bit2me', 'GoCardless', 'Lydia', 'Criptan', 'capitalontap', 'multimarkts', 'NEXTCHANCE', 'bnext', 'bit2me', 'GoCardless', 'Lydia'];

  return (
    <section className="relative pt-44 pb-20 lg:pt-60 lg:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#45b6f7]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#6351d5]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-50/80 border border-slate-200/60 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#0faec1] animate-pulse"></span>
          <span className="text-sm text-[#1a3690] font-semibold tracking-wide">{t.hero.tag}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 text-[#032149] heading-display">
          {t.hero.title} <br className="hidden md:block" />
          <span className="gradient-text">{t.hero.titleHighlight}</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-loose">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 bg-[#6351d5] text-white hover:bg-[#5242b8] font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg shadow-[#6351d5]/15 hover:shadow-xl hover:shadow-[#6351d5]/20"
          >
            {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#etapas"
            className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-md"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
        <div className="mt-24 border-t border-slate-100 pt-12 overflow-hidden relative w-full max-w-6xl mx-auto">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-8">{t.hero.trust}</p>
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap gap-16 items-center">
              {logos.map((logo, i) => (
                <span key={i} className="text-2xl font-bold font-sans text-slate-300 hover:text-[#6351d5] transition-colors duration-300 cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
