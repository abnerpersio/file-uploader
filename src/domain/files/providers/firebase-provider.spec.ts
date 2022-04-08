import { getMockedFile } from '../../../../tests/utils/file';
import { FirebaseProvider } from './firebase-provider';

const IMAGE_URL = 'http://firebase/image.png';

const getUrlMock = jest.fn().mockResolvedValue(IMAGE_URL);
const uploadMock = jest.fn().mockResolvedValue(true);

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: () => getUrlMock(),
  ref: jest.fn().mockResolvedValue(true),
  uploadBytes: (props: unknown) => uploadMock(props),
}));

describe(FirebaseProvider.name, () => {
  const provider = new FirebaseProvider();

  it('should return clientName correctly', () => {
    expect(FirebaseProvider.clientName).toBe('firebase');
  });

  it('should upload file to firebase', async () => {
    const uploaded = await provider.upload({
      file: getMockedFile({
        filename: 'file.png',
        fieldname: 'png',
      }),
      metadata: {
        foo: 'bar',
        key: 'value',
      },
    });

    expect(getUrlMock).toHaveBeenCalledTimes(1);
    expect(uploadMock).toHaveBeenCalledTimes(1);
    expect(uploaded).toBe(IMAGE_URL);
  });
});
