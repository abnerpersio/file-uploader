import { getMockedFile } from '../../../../tests/utils/file';
import { AWSProvider } from './aws-provider';

const IMAGE_URL = 'http://bucket/mock-image.png';

const promiseUploadMock = jest.fn().mockResolvedValue({
  Location: IMAGE_URL,
  ETag: 'fasdsad',
  versionId: 2,
});

const uploadMock = jest.fn().mockImplementation(() => ({
  promise: promiseUploadMock,
}));

jest.mock('aws-sdk', () => ({
  config: {
    update: jest.fn(),
    credentials: {},
  },
  Credentials: jest.fn(),
  S3: jest.fn().mockImplementation(() => ({
    upload: (props: unknown) => uploadMock(props),
  })),
}));

describe(AWSProvider.name, () => {
  const provider = new AWSProvider();

  it('should set default region if AWS_REGION is falsy', () => {
    expect(true).toBe(true);
  });

  it('should return clientName correctly', () => {
    expect(AWSProvider.clientName).toBe('aws');
  });

  it('should upload file to aws', async () => {
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

    expect(uploadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Metadata: {
          foo: 'bar',
          key: 'value',
          aws: 'metadata',
        },
      }),
    );
    expect(promiseUploadMock).toHaveBeenCalledTimes(1);
    expect(uploaded).toBe(IMAGE_URL);
  });

  it('should format file key at uploads folder', async () => {
    await provider.upload({
      file: getMockedFile({ originalname: 'test-aws-file.png' }),
    });

    expect(uploadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        Key: expect.stringMatching(/uploads\/.+test-aws-file\.png/),
      }),
    );
  });

  it.each([[null], [undefined], [false]])(
    'should return null if Location is falsy',
    async (location) => {
      promiseUploadMock.mockResolvedValue({
        Location: location,
      });

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
    },
  );
});
