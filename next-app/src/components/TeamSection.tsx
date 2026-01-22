'use client';

import type { TranslationSet } from '@/lib/translations';

interface TeamSectionProps {
  t: TranslationSet;
}

export default function TeamSection({ t }: TeamSectionProps) {
  return (
    <section id="team" className="py-20 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#032149]">{t.team.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col items-center relative">
            <div className="relative mb-6">
              <div className="absolute -top-3 -right-3 w-48 h-48 border-t-4 border-r-4 border-[#45b6f7] rounded-tr-3xl z-0"></div>
              <div className="absolute -bottom-3 -left-3 w-48 h-48 border-b-4 border-l-4 border-[#1a3690] rounded-bl-3xl z-0"></div>
              <img
                src="https://i.imgur.com/O3vyNQB.png"
                alt="Alfonso"
                className="w-48 h-48 object-cover rounded-xl shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#032149] mb-2">Alfonso Sainz de Baranda</h3>
            <div className="px-6 py-1.5 bg-[#45b6f7]/20 text-[#1a3690] rounded-full font-bold text-sm mb-4">Founder & CEO</div>
            <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{t.team.bioAlfonso}</p>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="relative mb-6">
              <div className="absolute -top-3 -right-3 w-48 h-48 border-t-4 border-r-4 border-[#45b6f7] rounded-tr-3xl z-0"></div>
              <div className="absolute -bottom-3 -left-3 w-48 h-48 border-b-4 border-l-4 border-[#1a3690] rounded-bl-3xl z-0"></div>
              <img
                src="https://i.imgur.com/CvKj1sd.png"
                alt="Martin"
                className="w-48 h-48 object-cover rounded-xl shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#032149] mb-2">Martin Fila</h3>
            <div className="px-6 py-1.5 bg-[#45b6f7]/20 text-[#1a3690] rounded-full font-bold text-sm mb-4">Founder & COO</div>
            <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{t.team.bioMartin}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
