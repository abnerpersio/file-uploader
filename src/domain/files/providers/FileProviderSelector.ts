import { REQUIRED_FILE_CLIENT } from '../../../shared/constants/messages';
import { RequestError } from '../../../shared/errors/RequestError';

import { AWSProvider } from './AWSProvider';
import { FileProvider } from './FileProvider';
import { FirebaseProvider } from './FirebaseProvider';

export class FileProviderSelector {
  select(uploadClient: string): FileProvider {
    switch (uploadClient) {
      case AWSProvider.clientName:
        return new AWSProvider();

      case FirebaseProvider.clientName:
        return new FirebaseProvider();

      default:
        throw new RequestError(REQUIRED_FILE_CLIENT, 422);
    }
  }
}