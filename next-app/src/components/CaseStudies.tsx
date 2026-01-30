'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, ChevronUp, ArrowRight } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import { createSlug } from '@/lib/firebase';

interface CaseStudiesProps {
  t: TranslationSet;
}

export default function CaseStudies({ t }: CaseStudiesProps) {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section id="casos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#032149] tracking-tight">{t.cases.title}</h2>
          <p className="text-slate-600 text-lg">{t.cases.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.cases.list.map((item, i) => {
            const slug = createSlug(item.company);
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 cursor-pointer border border-slate-200/60 shadow-sm"
                onClick={() => setExpandedCase(expandedCase === i ? null : i)}
              >
                <div className="absolute -top-5 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-200/80 group-hover:border-[#6351d5]/50 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Users className="w-5 h-5 text-[#6351d5]" />
                </div>
                <div className="inline-block px-3 py-1 bg-slate-100/80 text-slate-600 text-xs font-semibold rounded-lg mb-5 uppercase tracking-widest">
                  {item.company}
                </div>
                <div className="mb-5">
                  <div className="text-4xl font-black text-[#6351d5] mb-1 tracking-tight">{item.stat}</div>
                  <div className="text-slate-700 font-semibold text-base leading-snug">{item.label}</div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCase === i ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="bg-white border border-slate-200/50 p-4 rounded-xl mb-4 shadow-sm">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{t.cases.challengeLabel}</p>
                    <p className="text-slate-700 text-sm mb-3 leading-relaxed">{item.challenge}</p>
                    <p className="text-xs font-semibold text-[#6351d5] uppercase tracking-wider mb-1.5">{t.cases.solutionLabel}</p>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.solution}</p>
                  </div>
                  <Link
                    href={`/casos-de-exito/${slug}/`}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex items-center gap-2 px-4 py-2.5 bg-[#6351d5] hover:bg-[#5242b8] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Ver caso completo <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
                <button className="flex items-center text-[#032149] font-semibold text-sm group-hover:text-[#6351d5] transition-colors duration-300 mt-auto">
                  {expandedCase === i ? t.cases.btnHide : t.cases.btnRead}
                  <ChevronUp className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${expandedCase === i ? '' : 'rotate-180'}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Link to all case studies */}
        <div className="text-center mt-14">
          <Link
            href="/casos-de-exito/"
            className="group inline-flex items-center gap-2 text-[#6351d5] hover:text-[#5242b8] font-bold transition-all duration-300"
          >
            Ver todos los casos de éxito <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
