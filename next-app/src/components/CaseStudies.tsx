'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import { createSlug } from '@/lib/firebase';

interface CaseStudiesProps {
  t: TranslationSet;
}

// Icons for each case study to add visual interest
const caseIcons = [TrendingUp, Shield, Zap];

// Gradient backgrounds for each card
const cardGradients = [
  'from-[#6351d5]/5 via-transparent to-[#3f45fe]/5',
  'from-[#0faec1]/5 via-transparent to-[#45b6f7]/5',
  'from-[#f59e0b]/5 via-transparent to-[#fbbf24]/5',
];

// Accent colors for each card
const accentColors = ['#6351d5', '#0faec1', '#f59e0b'];

export default function CaseStudies({ t }: CaseStudiesProps) {
  return (
    <section id="casos" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#6351d5]/10 text-[#6351d5] text-sm font-bold rounded-full mb-4 uppercase tracking-wider">
            Resultados Probados
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#032149] tracking-tight">
            {t.cases.title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {t.cases.subtitle}
          </p>
        </div>

        {/* Featured Case (First) */}
        <div className="mb-8">
          {t.cases.list.slice(0, 1).map((item, i) => {
            const slug = createSlug(item.company);
            const Icon = caseIcons[0];
            return (
              <Link
                key={i}
                href={`/casos-de-exito/${slug}/`}
                className="group block"
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 relative overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-[#6351d5]/30">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{ backgroundColor: `${accentColors[0]}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: accentColors[0] }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {item.company}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span
                          className="text-6xl md:text-7xl font-black tracking-tight"
                          style={{ color: accentColors[0] }}
                        >
                          {item.stat}
                        </span>
                        <span className="block text-xl font-semibold text-[#032149] mt-1">
                          {item.label}
                        </span>
                      </div>

                      <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        {item.summary}
                      </p>

                      <div className="inline-flex items-center gap-2 text-[#6351d5] font-bold group-hover:gap-3 transition-all duration-300">
                        Descubre cómo lo logramos
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Right: Visual highlight box */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                            {t.cases.challengeLabel}
                          </p>
                          <p className="text-slate-700 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>
                        <div className="border-t border-slate-200 pt-4">
                          <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                            {t.cases.solutionLabel}
                          </p>
                          <p className="text-slate-700 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      </div>

                      {item.highlight && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm font-medium text-[#6351d5] italic">
                            &ldquo;{item.highlight}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Cases (2 columns) */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.cases.list.slice(1).map((item, i) => {
            const slug = createSlug(item.company);
            const Icon = caseIcons[i + 1];
            const actualIndex = i + 1;

            return (
              <Link
                key={actualIndex}
                href={`/casos-de-exito/${slug}/`}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-500 hover:border-slate-300/80 h-full">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[actualIndex]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${accentColors[actualIndex]}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: accentColors[actualIndex] }} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {item.company}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-4">
                      <span
                        className="text-4xl md:text-5xl font-black tracking-tight"
                        style={{ color: accentColors[actualIndex] }}
                      >
                        {item.stat}
                      </span>
                      <span className="block text-lg font-semibold text-[#032149] mt-1">
                        {item.label}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-slate-600 leading-relaxed mb-5 line-clamp-2">
                      {item.summary}
                    </p>

                    {/* Highlight teaser */}
                    {item.highlight && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                        <p className="text-sm text-slate-700 italic">
                          &ldquo;{item.highlight}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-2 font-bold group-hover:gap-3 transition-all duration-300"
                      style={{ color: accentColors[actualIndex] }}
                    >
                      Ver caso completo
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA to all cases */}
        <div className="text-center mt-14">
          <Link
            href="/casos-de-exito/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#032149] hover:bg-[#0a3a6e] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver todos los casos de éxito
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
