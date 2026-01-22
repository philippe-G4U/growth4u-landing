'use client';

import { Megaphone, TrendingUp, ShieldAlert, Users } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface ProblemSectionProps {
  t: TranslationSet;
}

export default function ProblemSection({ t }: ProblemSectionProps) {
  const Icons = [Megaphone, TrendingUp, ShieldAlert, Users];

  return (
    <section id="problema" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.problem.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.problem.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.problem.cards.map((item, i) => {
            const Icon = Icons[i];
            return (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 card-hover transition-all group shadow-sm hover:shadow-lg">
                <div className="bg-[#3f45fe]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#3f45fe]/20 transition-colors">
                  <Icon className="text-[#3f45fe] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#032149]">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
