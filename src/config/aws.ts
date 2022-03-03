import aws from 'aws-sdk';

export type UploadedFileAWSType = aws.S3.ManagedUpload.SendData;

aws.config.update({ region: process.env.AWS_REGION || 'us-east-1' });

aws.config.credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_ACCESS_TOKEN as string,
});

export const S3 = new aws.S3();

export const AWS_BUCKET = process.env.AWS_BUCKET as string;
