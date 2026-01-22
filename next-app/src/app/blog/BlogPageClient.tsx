'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Globe } from 'lucide-react';
import { translations, BOOKING_LINK } from '@/lib/translations';
import type { BlogPost } from '@/lib/blog';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [lang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white">
      <CookieBanner />

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
                <Link href="/" className="hover:text-[#6351d5] transition-colors px-2 py-2 rounded-md text-sm font-medium text-[#032149]">
                  Home
                </Link>
                <span className="text-[#6351d5] px-2 py-2 rounded-md text-sm font-bold">Blog</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 shadow-lg"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-[#6351d5] font-bold text-sm mb-4">
              INSIGHTS & ESTRATEGIA
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#032149] mb-6">Blog Growth4U</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Recursos estratégicos para escalar tu fintech sin depender de paid media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              >
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#6351d5] uppercase tracking-wide border border-slate-200 shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-50">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <span className="text-[#6351d5] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}
