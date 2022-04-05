import { FILE_CLIENT_NOT_FOUND } from '@shared/constants/messages';
import { RequestError } from '@shared/errors/request-error';

import { FileProvider } from './file-provider';
import { AWSProvider } from './providers/aws-provider';
import { AzureProvider } from './providers/azure-provider';
import { FirebaseProvider } from './providers/firebase-provider';
import { GoogleCloudProvider } from './providers/google-cloud-provider';

export class FileProviderSelector {
  select(uploadClient: string): FileProvider {
    switch (uploadClient) {
      case AWSProvider.clientName:
        return new AWSProvider();

      case FirebaseProvider.clientName:
        return new FirebaseProvider();

      case GoogleCloudProvider.clientName:
        return new GoogleCloudProvider();

      case AzureProvider.clientName:
        return new AzureProvider();

      default:
        throw new RequestError(FILE_CLIENT_NOT_FOUND, 400);
    }
  }
}
