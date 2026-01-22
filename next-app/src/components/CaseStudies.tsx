'use client';

import { useState } from 'react';
import { Users, ChevronUp } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface CaseStudiesProps {
  t: TranslationSet;
}

export default function CaseStudies({ t }: CaseStudiesProps) {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section id="casos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#032149]">{t.cases.title}</h2>
          <p className="text-slate-600">{t.cases.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.cases.list.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100"
              onClick={() => setExpandedCase(expandedCase === i ? null : i)}
            >
              <div className="absolute -top-6 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-slate-100 group-hover:border-[#6351d5] transition-colors shadow-lg">
                <Users className="w-6 h-6 text-[#6351d5]" />
              </div>
              <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-full mb-6 uppercase tracking-wider">
                {item.company}
              </div>
              <div className="mb-6">
                <div className="text-5xl font-extrabold text-[#6351d5] mb-2">{item.stat}</div>
                <div className="text-slate-700 font-bold text-lg leading-tight">{item.label}</div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCase === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="bg-slate-50 p-4 rounded-xl mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t.cases.challengeLabel}</p>
                  <p className="text-slate-700 text-sm mb-3">{item.challenge}</p>
                  <p className="text-xs font-bold text-[#6351d5] uppercase mb-1">{t.cases.solutionLabel}</p>
                  <p className="text-slate-700 text-sm">{item.solution}</p>
                </div>
              </div>
              <button className="flex items-center text-[#032149] font-bold text-sm group-hover:text-[#6351d5] transition-colors mt-auto">
                {expandedCase === i ? t.cases.btnHide : t.cases.btnRead} <ChevronUp className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
