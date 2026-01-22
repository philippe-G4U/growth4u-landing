'use client';

import { TrendingDown, Users2, Bot, Landmark } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface ResultsSectionProps {
  t: TranslationSet;
}

export default function ResultsSection({ t }: ResultsSectionProps) {
  const Icons = [TrendingDown, Users2, Bot, Landmark];

  return (
    <section id="resultados" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.results.title}</h2>
          <p className="text-slate-600 text-lg">{t.results.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.results.cards.map((card, i) => {
            const Icon = Icons[i];
            const color = i % 3 === 0 ? '#6351d5' : '#3f45fe';
            return (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-3xl border-l-4 flex items-start gap-6 hover:shadow-lg transition-shadow"
                style={{ borderColor: color }}
              >
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <Icon className="w-8 h-8" style={{ color: color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#032149] mb-2">{card.title}</h3>
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
