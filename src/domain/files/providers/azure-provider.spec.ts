import { getMockedFile } from '../../../../tests/utils/file';
import { AzureProvider } from './azure-provider';

const IMAGE_URL = 'http://mock/file.png';

const uploadMock = jest.fn().mockResolvedValue({ url: IMAGE_URL });
const setMetadataMock = jest.fn().mockResolvedValue(true);

const getBlockBlobMock = jest.fn().mockImplementation(() => ({
  setMetadata: (props: unknown) => setMetadataMock(props),
  uploadData: () => uploadMock(),
  url: IMAGE_URL,
}));

const getContainerMock = jest.fn().mockImplementation(() => ({
  getBlockBlobClient: () => getBlockBlobMock(),
}));

jest.mock('@azure/storage-blob', () => ({
  BlobServiceClient: jest.fn().mockImplementation(() => ({
    getContainerClient: () => getContainerMock(),
  })),
  StorageSharedKeyCredential: jest.fn(),
}));

describe(AzureProvider.name, () => {
  const provider = new AzureProvider();

  it('should return clientName correctly', () => {
    expect(AzureProvider.clientName).toBe('azure');
  });

  it('should upload file to azure', async () => {
    const uploaded = await provider.upload({
      file: getMockedFile({
        filename: 'test-file.png',
        fieldname: 'png',
      }),
      metadata: {
        testing: 'meta',
      },
    });

    expect(setMetadataMock).toHaveBeenCalledWith({ testing: 'meta' });
    expect(uploadMock).toHaveBeenCalledTimes(1);
    expect(uploaded).toBe(IMAGE_URL);
  });

  it('should return null if container is falsy', async () => {
    getContainerMock.mockReturnValue(null);

    const uploaded = await provider.upload({
      file: getMockedFile({
        filename: 'file.png',
        fieldname: 'png',
        originalname: 'test-aws-file.png',
      }),
      metadata: {
        foo: 'bar',
        key: 'value',
        aws: 'metadata',
      },
    });

    expect(uploaded).toBeNull();
  });

  it('should return null if client is falsy', async () => {
    getContainerMock.mockImplementation(() => ({
      getBlockBlobClient: jest.fn().mockReturnValue(null),
    }));

    const uploaded = await provider.upload({
      file: getMockedFile({
        filename: 'file.png',
        fieldname: 'png',
        originalname: 'test-aws-file.png',
      }),
      metadata: {
        foo: 'bar',
        key: 'value',
        aws: 'metadata',
      },
    });

    expect(uploaded).toBeNull();
  });
});
