import { getAllPosts } from '@/lib/blog';
import HomeClient from './HomeClient';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const posts = await getAllPosts();

  return <HomeClient initialPosts={posts} />;
}
