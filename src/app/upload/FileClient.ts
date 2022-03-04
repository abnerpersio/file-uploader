import { REQUIRED_FILE_CLIENT } from '../../shared/constants/messages';
import { RequestError } from '../../shared/errors/RequestError';

import { AWSClient } from './AWSClient';
import { FirebaseClient } from './FirebaseClient';

export interface IFileClient {
  upload(
    file: Express.Multer.File,
    fileName: string,
    metadata?: Record<string, any>,
  ): Promise<string | null>;
}

export class FileClientSelector {
  constructor(private uploadClient: string) {}

  select(): IFileClient {
    switch (this.uploadClient) {
      case AWSClient.clientName:
        return new AWSClient();

      case FirebaseClient.clientName:
        return new FirebaseClient();

      default:
        throw new RequestError(REQUIRED_FILE_CLIENT, 422);
    }
  }
}
