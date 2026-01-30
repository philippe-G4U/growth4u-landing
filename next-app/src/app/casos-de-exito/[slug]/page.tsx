import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Quote } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCaseStudyBySlug, getAllCaseStudySlugs, createSlug } from '@/lib/firebase';
import { translations } from '@/lib/translations';
import { BOOKING_LINK } from '@/lib/translations';
import CookieBanner from '@/components/CookieBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Generate params from static translations (always available)
  const staticSlugs = translations.es.cases.list.map((item) => createSlug(item.company));

  // Try to get dynamic case studies from Firebase
  let dynamicSlugs: string[] = [];
  try {
    dynamicSlugs = await getAllCaseStudySlugs();
  } catch (error) {
    console.error('Error fetching case studies from Firebase:', error);
  }

  // Combine static and dynamic slugs, removing duplicates
  const allSlugs = [...new Set([...staticSlugs, ...dynamicSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Caso no encontrado',
    };
  }

  return {
    title: `${caseStudy.company} - Caso de Éxito | Growth4U`,
    description: caseStudy.summary,
    alternates: {
      canonical: `/casos-de-exito/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.company} - Caso de Éxito | Growth4U`,
      description: caseStudy.summary,
      type: 'article',
      images: caseStudy.image
        ? [
            {
              url: caseStudy.image,
              width: 1200,
              height: 630,
              alt: caseStudy.company,
            },
          ]
        : [],
    },
  };
}

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${caseStudy.company} - Caso de Éxito`,
    description: caseStudy.summary,
    image: caseStudy.image,
    author: { '@type': 'Organization', name: 'Growth4U' },
    publisher: {
      '@type': 'Organization',
      name: 'Growth4U',
      logo: { '@type': 'ImageObject', url: 'https://i.imgur.com/imHxGWI.png' },
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
      <CookieBanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
          </Link>
          <Link href="/casos-de-exito" className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Todos los casos
          </Link>
        </div>
      </nav>

      <article className="pt-32 pb-20 max-w-4xl mx-auto px-4">
        <span className="inline-block px-3 py-1 bg-[#6351d5]/10 text-[#6351d5] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          {caseStudy.company}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#032149] leading-tight">
          {caseStudy.stat} <span className="text-[#6351d5]">{caseStudy.statLabel}</span>
        </h1>
        <p className="text-xl text-slate-600 mb-4">{caseStudy.summary}</p>
        {caseStudy.highlight && (
          <p className="text-lg font-medium text-[#6351d5] mb-8">{caseStudy.highlight}</p>
        )}

        {caseStudy.image && (
          <img src={caseStudy.image} alt={caseStudy.company} className="w-full h-auto object-cover rounded-3xl shadow-xl mb-12" />
        )}

        {/* Video embed */}
        {caseStudy.videoUrl && (
          <div className="mb-12">
            <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={caseStudy.videoUrl.includes('youtube.com/watch')
                  ? caseStudy.videoUrl.replace('watch?v=', 'embed/')
                  : caseStudy.videoUrl.includes('youtu.be/')
                    ? caseStudy.videoUrl.replace('youtu.be/', 'youtube.com/embed/')
                    : caseStudy.videoUrl
                }
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Video: ${caseStudy.company}`}
              />
            </div>
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">El Reto</h2>
            <p className="text-slate-700 leading-relaxed">{caseStudy.challenge}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-sm font-bold text-green-500 uppercase tracking-wider mb-4">La Solución</h2>
            <p className="text-slate-700 leading-relaxed">{caseStudy.solution}</p>
          </div>
        </div>

        {/* Results */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#032149] mb-6">Resultados Clave</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.results.map((result, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{result}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {caseStudy.content && (
          <div className="prose prose-lg prose-slate mx-auto text-[#032149] mb-12">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-[#032149]">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#032149]">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-700">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-5 mb-6 space-y-2 text-slate-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-slate-700">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{children}</li>,
                strong: ({ children }) => <strong className="text-[#032149] font-bold">{children}</strong>,
                a: ({ href, children }) => (
                  <a href={href} className="text-[#6351d5] underline hover:text-[#3f45fe] font-bold" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#6351d5] pl-4 italic my-4 text-slate-600 bg-slate-50 py-2 pr-2 rounded-r">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-slate-600 border-t border-slate-100">{children}</td>
                ),
              }}
            >
              {caseStudy.content}
            </Markdown>
          </div>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div className="bg-slate-50 rounded-2xl p-8 mb-12 relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#6351d5]/20" />
            <blockquote className="text-xl text-slate-700 italic mb-6 pl-8">
              &ldquo;{caseStudy.testimonial}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 pl-8">
              <div className="w-12 h-12 bg-[#6351d5] rounded-full flex items-center justify-center text-white font-bold">
                {caseStudy.testimonialAuthor?.charAt(0) || 'C'}
              </div>
              <div>
                <p className="font-bold text-[#032149]">{caseStudy.testimonialAuthor || 'Cliente'}</p>
                <p className="text-sm text-slate-500">{caseStudy.testimonialRole || caseStudy.company}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-slate-200 text-center">
          <h3 className="text-2xl font-bold mb-6">¿Quieres resultados similares?</h3>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#6351d5] hover:bg-[#3f45fe] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Agendar Llamada <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </article>
    </div>
  );
}
