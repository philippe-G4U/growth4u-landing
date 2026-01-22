import { getAllPosts } from '@/lib/firebase';
import HomeClient from './HomeClient';

export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';

export default async function HomePage() {
  const posts = await getAllPosts();

  return <HomeClient initialPosts={posts} />;
}
