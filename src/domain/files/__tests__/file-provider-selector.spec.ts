import { FileProviderSelector } from '../file-provider-selector';
import { AWSProvider } from '../providers/aws-provider';
import { FirebaseProvider } from '../providers/firebase-provider';

describe(FileProviderSelector.name, () => {
  const fileProviderSelector = new FileProviderSelector();

  it.each([
    { provider: 'aws-s3', instance: AWSProvider },
    { provider: 'firebase', instance: FirebaseProvider },
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
