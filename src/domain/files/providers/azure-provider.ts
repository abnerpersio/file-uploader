import { AZURE_CONTAINER, azureStorage } from '@config/azure';

import { FileProvider } from '../file-provider';
import { SendFileParams } from '../types/file';

export class AzureProvider extends FileProvider {
  static readonly clientName = 'azure';

  protected async sendFile({ file, fileName, metadata }: SendFileParams): Promise<string | null> {
    const azureContainer = azureStorage.getContainerClient(AZURE_CONTAINER);
    if (!azureContainer) return null;

    const client = azureContainer.getBlockBlobClient(fileName);
    if (!client) return null;

    await client.setMetadata(metadata);
    await client.uploadData(file.buffer);
    return client.url;
  }
}
