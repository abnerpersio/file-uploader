import { REQUIRED_FILE_CLIENT } from '../../shared/constants/messages';
import { RequestError } from '../../shared/errors/RequestError';

import { AWSProvider } from './AWSProvider';
import { FirebaseProvider } from './FirebaseProvider';

export interface IFileProvider {
  upload(
    file: Express.Multer.File,
    fileName: string,
    metadata?: Record<string, any>,
  ): Promise<string | null>;
}

export class FileProviderSelector {
  constructor(private uploadClient: string) {}

  select(): IFileProvider {
    switch (this.uploadClient) {
      case AWSProvider.clientName:
        return new AWSProvider();

      case FirebaseProvider.clientName:
        return new FirebaseProvider();

      default:
        throw new RequestError(REQUIRED_FILE_CLIENT, 422);
    }
  }
}
