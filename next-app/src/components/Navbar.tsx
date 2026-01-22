'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Globe } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import { BOOKING_LINK } from '@/lib/translations';

interface NavbarProps {
  t: TranslationSet;
  lang: string;
  onToggleLang: () => void;
}

export default function Navbar({ t, lang, onToggleLang }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="nav-island w-full max-w-6xl">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-0 cursor-pointer group flex-shrink-0">
              <img
                src="https://i.imgur.com/imHxGWI.png"
                alt="Growth4U Logo"
                className="h-5 md:h-6 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-baseline space-x-6">
                <a href="#problema" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.problem}
                </a>
                <a href="#resultados" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.results}
                </a>
                <a href="#etapas" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.methodology}
                </a>
                <a href="#casos" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.cases}
                </a>
                <a href="#team" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.team}
                </a>
                <Link href="/blog" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  {t.nav.blog}
                </Link>
              </div>
              <button
                onClick={onToggleLang}
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#032149] transition-colors border border-slate-200"
              >
                <Globe className="w-3 h-3" /> {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-[#6351d5]/20 hover:shadow-[#6351d5]/40 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t.nav.cta}
              </a>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button onClick={onToggleLang} className="text-[#032149] font-bold text-sm">
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#032149] hover:text-[#6351d5] focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 mx-4 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <a href="#problema" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">
                {t.nav.problem}
              </a>
              <a href="#resultados" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">
                {t.nav.results}
              </a>
              <a href="#etapas" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">
                {t.nav.methodology}
              </a>
              <a href="#casos" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">
                {t.nav.cases}
              </a>
              <a href="#team" onClick={() => setIsMenuOpen(false)} className="text-[#032149] hover:text-[#6351d5] block px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50">
                {t.nav.team}
              </a>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#032149] hover:text-[#6351d5] block w-full text-left px-3 py-3 rounded-xl text-base font-medium hover:bg-slate-50"
              >
                {t.nav.blog}
              </Link>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-white bg-[#6351d5] font-bold block px-3 py-3 rounded-xl text-base mt-4 text-center whitespace-nowrap"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
