import { Storage } from '@google-cloud/storage';
import { InvalidConfiguration } from '@shared/errors/invalid-configuration';

const credentials: Record<string, string> = {
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID as string,
  GOOGLE_CLOUD_PRIVATE_KEY: process.env.GOOGLE_CLOUD_PRIVATE_KEY as string,
  GOOGLE_CLOUD_ACCOUNT_EMAIL: process.env.GOOGLE_CLOUD_ACCOUNT_EMAIL as string,
  GOOGLE_CLOUD_BUCKET: process.env.GOOGLE_CLOUD_BUCKET as string,
};

function verifyEnvs() {
  if (process.env.NODE_ENV === 'test') return;

  for (const key of Object.keys(credentials)) {
    if (!credentials[key]) throw new InvalidConfiguration('google_cloud', key);
  }
}

export const googleCloudStorage = new Storage({
  projectId: credentials.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    private_key: credentials.GOOGLE_CLOUD_PRIVATE_KEY,
    client_email: credentials.GOOGLE_CLOUD_ACCOUNT_EMAIL,
  },
});

export const { GOOGLE_CLOUD_BUCKET } = credentials;

verifyEnvs();
