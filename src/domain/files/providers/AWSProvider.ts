import { AWS_BUCKET, S3, UploadedFileAWSType } from '@config/aws';
import { FileProvider } from './FileProvider';

export class AWSProvider extends FileProvider {
  static readonly clientName = 'aws-s3';

  async upload(file: Express.Multer.File, metadata: Record<string, any>): Promise<string | null> {
    const PUBLIC_READ_FILE_ACL = 'public-read';
    const fileName = this.formatFileName(file.originalname);

    const FILE_PATH = `uploads/${fileName}`;

    let pathLocation = null;

    const upload = S3.upload({
      Bucket: AWS_BUCKET,
      Key: FILE_PATH,
      Body: file.buffer,
      ACL: PUBLIC_READ_FILE_ACL,
      Metadata: metadata,
    });

    upload.send((error: Error, uploaded: UploadedFileAWSType) => {
      if (error) throw error;

      pathLocation = uploaded.Location || null;
    });

    return pathLocation;
  }
}