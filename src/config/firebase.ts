import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const firebaseStorage = getStorage(firebaseApp);
