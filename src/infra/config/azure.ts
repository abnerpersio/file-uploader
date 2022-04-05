import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { InvalidConfiguration } from '@shared/errors/invalid-configuration';

const credentials: Record<string, string> = {
  AZURE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT_NAME as string,
  AZURE_KEY: process.env.AZURE_STORAGE_KEY as string,
  AZURE_URL: `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  AZURE_CONTAINER: process.env.AZURE_CONTAINER as string,
};

function verifyEnvs() {
  if (process.env.NODE_ENV === 'test') return;

  for (const key of Object.keys(credentials)) {
    if (!credentials[key]) throw new InvalidConfiguration('azure', key);
  }
}

const keyCredential = new StorageSharedKeyCredential(
  credentials.AZURE_ACCOUNT,
  credentials.AZURE_KEY,
);

export const azureStorage = new BlobServiceClient(credentials.AZURE_URL, keyCredential);

export const { AZURE_CONTAINER } = credentials;

verifyEnvs();
