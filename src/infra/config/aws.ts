import aws from 'aws-sdk';

import { InvalidConfiguration } from '@shared/errors/invalid-configuration';

export type UploadedFileAWSType = aws.S3.ManagedUpload.SendData;

const credentials: Record<string, string> = {
  AWS_REGION: process.env.AWS_REGION as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_ACCESS_TOKEN: process.env.AWS_ACCESS_TOKEN as string,
  AWS_BUCKET: process.env.AWS_BUCKET as string,
};

function verifyEnvs() {
  if (process.env.NODE_ENV === 'test') return;

  for (const key of Object.keys(credentials)) {
    if (!credentials[key]) throw new InvalidConfiguration('aws', key);
  }
}

aws.config.update({ region: credentials.AWS_REGION || 'us-east-1' });

aws.config.credentials = new aws.Credentials({
  accessKeyId: credentials.AWS_ACCESS_KEY_ID,
  secretAccessKey: credentials.AWS_ACCESS_TOKEN,
});

export const S3 = new aws.S3();

export const { AWS_BUCKET } = credentials;

verifyEnvs();
