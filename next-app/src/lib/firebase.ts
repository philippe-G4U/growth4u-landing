import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

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

// Feedback functions
export interface FeedbackData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  mainChallenge: string;
  howIdentifiedProblem: string;
  teamIntegration: string;
  proposedSolutions: string;
  technicalExecution: string;
  quizFlowHighlights: string;
  iterativeApproach: string;
  conversionComparison: string;
  autonomousImprovement: string;
  scalingConfidence: string;
  wouldRecommend: string;
  standoutAspects: string;
  additionalComments: string;
}

export async function saveFeedback(data: FeedbackData): Promise<string> {
  try {
    const feedbackRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'feedback');
    const docRef = await addDoc(feedbackRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
}

export interface FeedbackResponse extends FeedbackData {
  id: string;
  createdAt: Date | null;
}

export async function getAllFeedback(): Promise<FeedbackResponse[]> {
  try {
    const feedbackRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'feedback');
    const q = query(feedbackRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        companyName: data.companyName || '',
        contactName: data.contactName || '',
        contactEmail: data.contactEmail || '',
        mainChallenge: data.mainChallenge || '',
        howIdentifiedProblem: data.howIdentifiedProblem || '',
        teamIntegration: data.teamIntegration || '',
        proposedSolutions: data.proposedSolutions || '',
        technicalExecution: data.technicalExecution || '',
        quizFlowHighlights: data.quizFlowHighlights || '',
        iterativeApproach: data.iterativeApproach || '',
        conversionComparison: data.conversionComparison || '',
        autonomousImprovement: data.autonomousImprovement || '',
        scalingConfidence: data.scalingConfidence || '',
        wouldRecommend: data.wouldRecommend || '',
        standoutAspects: data.standoutAspects || '',
        additionalComments: data.additionalComments || '',
        createdAt: data.createdAt?.toDate() || null,
      };
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return [];
  }
}

export { db };
