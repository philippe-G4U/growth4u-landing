import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGtatMbThV_pupfPk6ytO5omidlJrQLcw",
  authDomain: "landing-growth4u.firebaseapp.com",
  projectId: "landing-growth4u",
  storageBucket: "landing-growth4u.firebasestorage.app",
  messagingSenderId: "562728954202",
  appId: "1:562728954202:web:90cff4aa486f38b4b62b63",
  measurementId: "G-4YBYPVQDT6"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const APP_ID = 'growth4u-public-app';

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
    const postsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'blog_posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

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

// Blog CRUD Operations
export interface BlogPostInput {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
}

export async function createPost(post: BlogPostInput): Promise<string> {
  const postsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'blog_posts');
  const docRef = await addDoc(postsRef, {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updatePost(postId: string, post: Partial<BlogPostInput>): Promise<void> {
  const postRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'blog_posts', postId);
  await updateDoc(postRef, {
    ...post,
    updatedAt: serverTimestamp()
  });
}

export async function deletePost(postId: string): Promise<void> {
  const postRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'blog_posts', postId);
  await deleteDoc(postRef);
}

// Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Restrict to specific domain
const ALLOWED_DOMAIN = 'growth4u.io';

export async function signInWithGoogle(): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const email = result.user.email || '';

    // Check if email domain is allowed
    if (!email.endsWith('@' + ALLOWED_DOMAIN)) {
      await signOut(auth);
      return { user: null, error: `Solo se permiten correos de @${ALLOWED_DOMAIN}` };
    }

    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email || '';
      if (!email.endsWith('@' + ALLOWED_DOMAIN)) {
        signOut(auth);
        callback(null);
        return;
      }
    }
    callback(user);
  });
}

export { db, auth };
