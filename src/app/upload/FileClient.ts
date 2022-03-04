import { REQUIRED_FILE_CLIENT } from '../../shared/constants/messages';
import { RequestError } from '../../shared/errors/RequestError';
import { AWSClient } from './AWSClient';

export interface IFileClient {
  upload(
    file: Express.Multer.File,
    fileName: string,
    metadata?: Record<string, any>,
  ): Promise<string | null>;
}

export class FileClientSelector {
  constructor(private client: string) {}

  select(): IFileClient {
    switch (this.client) {
      case 'aws-s3':
        return new AWSClient();

      default:
        throw new RequestError(REQUIRED_FILE_CLIENT, 422);
    }
  }
}
