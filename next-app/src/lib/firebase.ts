import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { translations, CaseStudy as StaticCaseStudy } from './translations';
import { caseStudiesData, StaticCaseStudyData } from './caseStudiesData';

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

// Case Studies
export interface CaseStudy {
  id: string;
  slug: string;
  company: string;
  logo: string;
  stat: string;
  statLabel: string;
  highlight: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  videoUrl: string;
  content: string;
  mediaUrl: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CaseStudyInput {
  company: string;
  logo: string;
  stat: string;
  statLabel: string;
  highlight: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  videoUrl: string;
  content: string;
  mediaUrl: string;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const casesRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'case_studies');
    const q = query(casesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: createSlug(data.company || ''),
        company: data.company || '',
        logo: data.logo || '',
        stat: data.stat || '',
        statLabel: data.statLabel || '',
        highlight: data.highlight || '',
        summary: data.summary || '',
        challenge: data.challenge || '',
        solution: data.solution || '',
        results: data.results || [],
        testimonial: data.testimonial || '',
        testimonialAuthor: data.testimonialAuthor || '',
        testimonialRole: data.testimonialRole || '',
        image: data.image || '',
        videoUrl: data.videoUrl || '',
        content: data.content || '',
        mediaUrl: data.mediaUrl || '',
        createdAt: data.createdAt?.toDate() || null,
        updatedAt: data.updatedAt?.toDate() || null,
      };
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

// Convert static case study from caseStudiesData to CaseStudy format
function staticToFullCaseStudy(slug: string): CaseStudy | null {
  const data = caseStudiesData[slug];
  if (!data) return null;

  return {
    id: `static-${slug}`,
    slug,
    company: data.company,
    logo: '',
    stat: data.stat,
    statLabel: data.label,
    highlight: data.highlight,
    summary: data.summary,
    challenge: data.challenge,
    solution: data.solution,
    results: data.results || [],
    testimonial: data.testimonial || '',
    testimonialAuthor: data.testimonialAuthor || '',
    testimonialRole: data.testimonialRole || '',
    image: data.image || '',
    videoUrl: data.videoUrl || '',
    content: data.content || '',
    mediaUrl: data.mediaUrl || '',
    createdAt: null,
    updatedAt: null,
  };
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  // First try to find in Firebase
  const cases = await getAllCaseStudies();
  const firebaseCase = cases.find((c) => c.slug === slug);
  if (firebaseCase) {
    return firebaseCase;
  }

  // If not found, try static case studies data (full content)
  const staticCaseStudy = staticToFullCaseStudy(slug);
  if (staticCaseStudy) {
    return staticCaseStudy;
  }

  return null;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const cases = await getAllCaseStudies();
  return cases.map((c) => c.slug);
}

export async function createCaseStudy(caseStudy: CaseStudyInput): Promise<string> {
  const casesRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'case_studies');
  const docRef = await addDoc(casesRef, {
    ...caseStudy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateCaseStudy(caseId: string, caseStudy: Partial<CaseStudyInput>): Promise<void> {
  const caseRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'case_studies', caseId);
  await updateDoc(caseRef, {
    ...caseStudy,
    updatedAt: serverTimestamp()
  });
}

export async function deleteCaseStudy(caseId: string): Promise<void> {
  const caseRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'case_studies', caseId);
  await deleteDoc(caseRef);
}

export { db, auth, doc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy };
