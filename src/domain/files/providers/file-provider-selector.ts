import { FILE_CLIENT_NOT_FOUND } from '@shared/constants/messages';
import { RequestError } from '@shared/errors/request-error';

import { AWSProvider } from './aws-provider';
import { FileProvider } from './file-provider';
import { FirebaseProvider } from './firebase-provider';
import { GoogleCloudProvider } from './google-cloud-provider';

export class FileProviderSelector {
  select(uploadClient: string): FileProvider {
    switch (uploadClient) {
      case AWSProvider.clientName:
        return new AWSProvider();

      case FirebaseProvider.clientName:
        return new FirebaseProvider();

      case GoogleCloudProvider.clientName:
        return new GoogleCloudProvider();

      default:
        throw new RequestError(FILE_CLIENT_NOT_FOUND, 400);
    }
  }
}
