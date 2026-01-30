'use client';

import { TrendingDown, Users2, Bot, Landmark } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface ResultsSectionProps {
  t: TranslationSet;
}

export default function ResultsSection({ t }: ResultsSectionProps) {
  const Icons = [TrendingDown, Users2, Bot, Landmark];

  return (
    <section id="resultados" className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149] tracking-tight">{t.results.title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed">{t.results.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.results.cards.map((card, i) => {
            const Icon = Icons[i];
            const color = i % 2 === 0 ? '#6351d5' : '#3f45fe';
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-slate-50/50 p-6 rounded-2xl border-t-4 flex items-start gap-5 hover:shadow-md transition-all duration-300 ease-out border border-slate-100 hover:border-slate-200/60"
                style={{ borderTopColor: color }}
              >
                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                  <Icon className="w-7 h-7" style={{ color: color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#032149] mb-1.5">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
