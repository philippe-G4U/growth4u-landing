'use client';

import { Megaphone, TrendingUp, ShieldAlert, Users } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface ProblemSectionProps {
  t: TranslationSet;
}

export default function ProblemSection({ t }: ProblemSectionProps) {
  const Icons = [Megaphone, TrendingUp, ShieldAlert, Users];

  return (
    <section id="problema" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149] tracking-tight">{t.problem.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">{t.problem.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.problem.cards.map((item, i) => {
            const Icon = Icons[i];
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 transition-all duration-300 ease-out group shadow-sm hover:shadow-md hover:border-slate-300/60 hover:-translate-y-1">
                <div className="bg-[#3f45fe]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#3f45fe]/15 transition-colors duration-300 border border-[#3f45fe]/5">
                  <Icon className="text-[#3f45fe] w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2.5 text-[#032149]">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
