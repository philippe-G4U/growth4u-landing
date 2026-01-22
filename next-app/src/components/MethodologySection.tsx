'use client';

import { Target, CheckCircle2 } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';

interface MethodologySectionProps {
  t: TranslationSet;
}

function renderFormattedContent(content: string | string[]): React.ReactNode {
  if (!content) return null;

  if (Array.isArray(content)) {
    return content.map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={i} className="flex items-start gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-[#0faec1] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-700">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={j} className="text-[#032149] font-bold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        </div>
      );
    });
  }

  const lines = content.split('\n');
  return lines.map((line, index) => {
    if (line.trim().startsWith('##')) {
      return (
        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-[#032149]">
          {line.replace('##', '').trim()}
        </h2>
      );
    }
    if (line.trim() === '') return <div key={index} className="h-4"></div>;
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={index}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="text-[#032149] font-bold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  });
}

export default function MethodologySection({ t }: MethodologySectionProps) {
  return (
    <section id="etapas" className="py-24 relative bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">{t.methodology.title}</h2>
          <p className="text-slate-600 text-lg">{t.methodology.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.methodology.stages.map((stage, i) => (
            <div key={i} className="relative group hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col shadow-lg border border-slate-100 hover:shadow-2xl hover:border-[#45b6f7]/30 transition-all">
                <div className="mb-6">
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stage.step}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-extrabold text-[#032149] uppercase">{stage.title}</h3>
                    {stage.icon && <stage.icon className="w-6 h-6 text-[#45b6f7]" />}
                  </div>
                  <span className="inline-block px-3 py-1 bg-[#0faec1]/10 text-[#0faec1] text-xs font-bold rounded-full border border-[#0faec1]/20">
                    {stage.tag}
                  </span>
                </div>
                <div className="text-slate-600 text-sm leading-relaxed mb-8">{renderFormattedContent(stage.desc)}</div>
                <div className="mt-auto bg-[#effcfd] rounded-2xl p-6 border border-[#0faec1]/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-[#0faec1]" />
                    <span className="text-xs font-bold text-[#0faec1] uppercase tracking-wider">{stage.guaranteeTitle}</span>
                  </div>
                  <div className="space-y-1">{renderFormattedContent(stage.guarantees)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
