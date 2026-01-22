import { adminDb } from './firebase-admin';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const APP_ID = 'growth4u-public-app';

export function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = adminDb
      .collection('artifacts')
      .doc(APP_ID)
      .collection('public')
      .doc('data')
      .collection('blog_posts');

    const snapshot = await postsRef.orderBy('createdAt', 'desc').get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        slug: createSlug(data.title || ''),
        category: data.category || 'Estrategia',
        excerpt: data.excerpt || '',
        content: data.content || '',
        image: data.image || '',
        readTime: data.readTime || '5 min lectura',
        author: data.author || 'Equipo Growth4U',
        createdAt: data.createdAt?.toDate() || null,
        updatedAt: data.updatedAt?.toDate() || null,
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
