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
    <section id="contacto" className="bg-[#032149] py-24 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">{t.footer.title}</h2>
        <div className="flex flex-col md:flex-row justify-center gap-5 mb-14">
          <a
            href={`mailto:${t.footer.ctaEmail}`}
            className="group flex items-center justify-center gap-2.5 bg-[#6351d5] hover:bg-[#5242b8] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-[#6351d5]/20 hover:shadow-xl hover:shadow-[#6351d5]/25 transition-all duration-300"
          >
            <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" /> {t.footer.ctaEmail}
          </a>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 whitespace-nowrap"
          >
            <Calendar className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" /> {t.footer.ctaCall}
          </a>
        </div>
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacidad" className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
              {t.footer.privacy}
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
