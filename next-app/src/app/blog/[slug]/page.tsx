import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug, getAllSlugs } from '@/lib/blog';
import { BOOKING_LINK } from '@/lib/translations';
import CookieBanner from '@/components/CookieBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.createdAt?.toISOString() || new Date().toISOString(),
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Growth4U',
      logo: { '@type': 'ImageObject', url: 'https://i.imgur.com/imHxGWI.png' },
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#032149] font-sans selection:bg-[#45b6f7] selection:text-white">
      <CookieBanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-0 cursor-pointer">
            <img src="https://i.imgur.com/imHxGWI.png" alt="Growth4U" className="h-6 w-auto" />
          </Link>
          <Link href="/blog" className="text-sm font-bold text-[#6351d5] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </div>
      </nav>

      <article className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <span className="inline-block px-3 py-1 bg-[#6351d5]/10 text-[#6351d5] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#032149] leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-8 border-b border-slate-100 pb-8">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
          <span>•</span>
          <span>{post.createdAt ? post.createdAt.toLocaleDateString('es-ES') : 'Fecha no disponible'}</span>
        </div>
        <img src={post.image} alt={post.title} className="w-full h-auto object-cover rounded-3xl shadow-xl mb-12" />

        <div className="prose prose-lg prose-slate mx-auto text-[#032149]">
          <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed italic border-l-4 border-[#6351d5] pl-6">
            {post.excerpt}
          </p>
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
                <a href={href} className="text-[#6351d5] underline hover:text-[#3f45fe] font-bold">
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
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 border-t border-slate-100">{children}</td>
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-200 text-center">
          <h3 className="text-2xl font-bold mb-6">¿Quieres aplicar esto en tu Fintech?</h3>
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
