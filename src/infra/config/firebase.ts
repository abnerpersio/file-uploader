import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { InvalidConfiguration } from '@shared/errors/invalid-configuration';

const credentials: Record<string, string> = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY as string,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
};

for (const key of Object.keys(credentials)) {
  if (!credentials[key]) throw new InvalidConfiguration('firebase');
}

const firebaseApp = initializeApp({
  apiKey: credentials.FIREBASE_API_KEY,
  storageBucket: credentials.FIREBASE_STORAGE_BUCKET,
  projectId: credentials.FIREBASE_PROJECT_ID,
});

export const firebaseStorage = getStorage(firebaseApp);
