import { getMockedFile } from '../../../../tests/utils/file';
import { GoogleCloudProvider } from './google-cloud-provider';

const saveFileMock = jest.fn().mockResolvedValue(true);
const setMetadataMock = jest.fn();

const IMAGE_URL = 'http://google-cloud/image.png';

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => ({
    bucket: jest.fn().mockImplementation(() => ({
      file: jest.fn().mockReturnValue({
        setMetadata: (props: unknown) => setMetadataMock(props),
        save: (props: unknown) => saveFileMock(props),
        makePublic: jest.fn(),
        publicUrl: jest.fn().mockResolvedValue(IMAGE_URL),
      }),
    })),
  })),
}));

describe(GoogleCloudProvider.name, () => {
  const provider = new GoogleCloudProvider();

  it('should return clientName correctly', () => {
    expect(GoogleCloudProvider.clientName).toBe('google_cloud');
  });

  it('should upload file to google_cloud', async () => {
    const uploaded = await provider.upload({
      file: getMockedFile({
        filename: 'file.png',
        fieldname: 'png',
      }),
      metadata: {
        meta: 'data',
      },
    });

    expect(setMetadataMock).toHaveBeenCalledWith({ meta: 'data' });
    expect(saveFileMock).toHaveBeenCalledTimes(1);
    expect(uploaded).toBe(IMAGE_URL);
  });
});
