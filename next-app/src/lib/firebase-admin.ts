import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID || 'landing-growth4u',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  }),
};

function initAdmin() {
  if (getApps().length === 0) {
    return initializeApp(firebaseAdminConfig);
  }
  return getApps()[0];
}

const adminApp = initAdmin();
const adminDb = getFirestore(adminApp);

export { adminDb };
