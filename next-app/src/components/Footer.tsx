'use client';

import Link from 'next/link';
import { Mail, Calendar } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import { BOOKING_LINK } from '@/lib/translations';

interface FooterProps {
  t: TranslationSet;
}

export default function Footer({ t }: FooterProps) {
  return (
    <section id="contacto" className="bg-[#032149] py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.footer.title}</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <a
            href={`mailto:${t.footer.ctaEmail}`}
            className="flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg shadow-[#6351d5]/30 transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" /> {t.footer.ctaEmail}
          </a>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 whitespace-nowrap"
          >
            <Calendar className="w-5 h-5" /> {t.footer.ctaCall}
          </a>
        </div>
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>{t.footer.rights}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
