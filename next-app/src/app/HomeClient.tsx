'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';
import type { BlogPost } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ResultsSection from '@/components/ResultsSection';
import MethodologySection from '@/components/MethodologySection';
import CaseStudies from '@/components/CaseStudies';
import TeamSection from '@/components/TeamSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

interface HomeClientProps {
  initialPosts: BlogPost[];
}

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#45b6f7] selection:text-white overflow-x-hidden">
      <CookieBanner />
      <Navbar t={t} lang={lang} onToggleLang={toggleLang} />
      <HeroSection t={t} />
      <ProblemSection t={t} />
      <ResultsSection t={t} />
      <MethodologySection t={t} />
      <CaseStudies t={t} />
      <TeamSection t={t} />
      <BlogPreviewSection t={t} posts={initialPosts} />
      <Footer t={t} />
    </div>
  );
}
