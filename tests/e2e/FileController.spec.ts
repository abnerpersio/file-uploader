import path from 'path';
import request from 'supertest';

import { FileController } from '@infra/controllers/FileController';

import server from '../../src/server';

jest.mock('aws-sdk', () => ({
  config: {
    update: jest.fn(),
    credentials: {},
  },
  Credentials: jest.fn(),
  S3: jest.fn().mockImplementation(() => ({
    upload: jest.fn().mockImplementation(() => ({
      on: jest.fn().mockReturnThis(),
      send: jest.fn().mockImplementation((cb: Function) => {
        cb(null, {
          Location: 'http://bucket/mock-image.png',
          ETag: 'fasdsad',
          versionId: 2,
        });
      }),
    })),
  })),
}));

describe(FileController.name, () => {
  const mockFile = path.resolve(__dirname, '..', 'mocks', 'mock-image.png');

  it('should upload a file', async () => {
    const response = await request(server)
      .post('/files')
      .query({ upload_provider: 'aws-s3' })
      .attach('file', mockFile);

    expect(response.status).toBe(201);
    expect(response.body.data).toStrictEqual({
      url: 'http://bucket/mock-image.png',
    });
  });

  it.each([
    { provider: 'invalid-provider' },
    { provider: 'invalid-provider--2' },
    { provider: null },
    { provider: undefined },
    { provider: '' },
    { provider: false },
  ])('should validate the upload_provider sent', async ({ provider }) => {
    const response = await request(server)
      .post('/files')
      .query({ upload_provider: provider })
      .attach('file', mockFile);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('The upload client was not found');
  });

  it('should validate required file', async () => {
    const response = await request(server).post('/files').query({ upload_provider: 'aws-s3' });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('File is required for uploading');
  });
});
