import { AWS_BUCKET, S3, UploadedFileAWSType } from '@config/aws';
import { IFileClient } from './FileClient';

export class AWSClient implements IFileClient {
  async upload(
    file: Express.Multer.File,
    fileName: string,
    metadata: Record<string, any>,
  ): Promise<string | null> {
    const PUBLIC_READ_FILE_ACL = 'public-read';

    const upload = S3.upload({
      Bucket: AWS_BUCKET,
      Key: `uploads/${fileName}`,
      Body: file.buffer,
      ACL: PUBLIC_READ_FILE_ACL,
      Metadata: metadata,
    });

    let pathLocation = null;

    upload.send((error: Error, uploaded: UploadedFileAWSType) => {
      if (error) throw error;

      pathLocation = uploaded.Location || null;
    });

    return pathLocation;
  }
}
