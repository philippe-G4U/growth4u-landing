'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import type { TranslationSet } from '@/lib/translations';
import type { BlogPost } from '@/lib/firebase';

interface BlogPreviewSectionProps {
  t: TranslationSet;
  posts: BlogPost[];
}

export default function BlogPreviewSection({ t, posts }: BlogPreviewSectionProps) {
  const homePosts = posts.slice(0, 6);

  return (
    <section id="blog-preview" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#032149]">Últimos Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homePosts.length > 0 ? (
            homePosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#6351d5] uppercase tracking-wide border border-slate-200 shadow-sm">
                    {post.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#032149] group-hover:text-[#6351d5] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center text-sm text-slate-500 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-500">
              <p>{t.blog.empty}</p>
            </div>
          )}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#6351d5] text-[#6351d5] hover:bg-[#6351d5] hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
          >
            {t.blog.cta} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
