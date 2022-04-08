import { FileProviderSelector } from './file-provider-selector';
import { AWSProvider } from './providers/aws-provider';
import { AzureProvider } from './providers/azure-provider';
import { FirebaseProvider } from './providers/firebase-provider';
import { GoogleCloudProvider } from './providers/google-cloud-provider';

describe(FileProviderSelector.name, () => {
  const fileProviderSelector = new FileProviderSelector();

  it.each([
    { provider: 'aws', instance: AWSProvider },
    { provider: 'firebase', instance: FirebaseProvider },
    { provider: 'google_cloud', instance: GoogleCloudProvider },
    { provider: 'azure', instance: AzureProvider },
  ])('should select the right provider', ({ provider, instance }) => {
    const selectedProvider = fileProviderSelector.select(provider);

    expect(selectedProvider).toBeInstanceOf(instance);
  });

  it.each([
    { provider: 'invalid-provider' },
    { provider: null },
    { provider: undefined },
    { provider: '' },
    { provider: false },
  ])('should throw an error when selecting an invalid provider', async ({ provider }) => {
    expect(() => {
      fileProviderSelector.select(provider as string);
    }).toThrowError('The upload client was not found');
  });
});
