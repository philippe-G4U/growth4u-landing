import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/firebase';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights y estrategias de Growth para Fintechs B2B y B2C.',
  alternates: {
    canonical: '/blog',
  },
};

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogPageClient initialPosts={posts} />;
}
