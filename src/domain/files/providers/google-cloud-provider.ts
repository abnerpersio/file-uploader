import { GOOGLE_CLOUD_BUCKET, googleCloudStorage } from '@config/google-cloud';

import { FileProvider } from '../file-provider';
import { SendFileParams } from '../types/file';

export class GoogleCloudProvider extends FileProvider {
  static readonly clientName = 'google_cloud';

  async sendFile({ file, fileName, metadata }: SendFileParams): Promise<string | null> {
    const FILE_PATH = `uploads/${fileName}`;

    const bucket = googleCloudStorage.bucket(GOOGLE_CLOUD_BUCKET);

    const bucketFile = bucket.file(FILE_PATH);

    await bucketFile.save(file.buffer, {
      metadata,
      contentType: file.mimetype,
    });

    await bucketFile.makePublic();

    return bucketFile.publicUrl();
  }
}
