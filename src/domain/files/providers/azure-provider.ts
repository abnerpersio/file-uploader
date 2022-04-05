import { AZURE_CONTAINER, azureStorage } from '@config/azure';

import { FileProvider } from '../file-provider';
import { SendFileParams } from '../types/file';

export class AzureProvider extends FileProvider {
  static readonly clientName = 'azure';

  async sendFile(params: SendFileParams): Promise<string | null> {
    const azureContainer = azureStorage.getContainerClient(AZURE_CONTAINER);
    const client = azureContainer.getBlockBlobClient(params.fileName);

    if (!azureContainer || !client) return null;

    await client.uploadData(params.file.buffer);
    return client.url;
  }
}
