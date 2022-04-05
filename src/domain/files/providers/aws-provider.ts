import { AWS_BUCKET, S3, UploadedFileAWSType } from '@config/aws';

import { FileProvider } from '../file-provider';
import { SendFileParams } from '../types/file';

export class AWSProvider extends FileProvider {
  static readonly clientName = 'aws';

  async sendFile({ file, fileName, metadata }: SendFileParams): Promise<string | null> {
    const PUBLIC_READ_FILE_ACL = 'public-read';

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
