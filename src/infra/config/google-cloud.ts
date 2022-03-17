import { Storage } from '@google-cloud/storage';

export const googleCloudStorage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLOUD_ACCOUNT_EMAIL,
  },
});

export const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET as string;
