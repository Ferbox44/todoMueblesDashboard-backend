import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const initializeFirebase = () => {
  try {
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });

    const db = getFirestore(app);
    console.log('Firebase initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}; 