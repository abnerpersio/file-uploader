import path from 'path';
import request from 'supertest';

import '@config/env';
import { FileController } from '@infra/controllers/file-controller';

import server from '../../src/server';

jest.mock('aws-sdk', () => ({
  config: {
    update: jest.fn(),
    credentials: {},
  },
  Credentials: jest.fn(),
  S3: jest.fn().mockImplementation(() => ({
    upload: jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValue({
        Location: 'http://bucket/mock-image.png',
        ETag: 'fasdsad',
        versionId: 2,
      }),
    })),
  })),
}));

describe(FileController.name, () => {
  const mockFile = path.resolve(__dirname, '..', 'mocks', 'mock-image.png');

  it('should upload a file', async () => {
    const response = await request(server)
      .post('/files')
      .query({ upload_provider: 'aws' })
      .attach('file', mockFile);

    console.log(response);

    expect(response.status).toBe(201);
    expect(response.body.data).toStrictEqual({
      url: 'http://bucket/mock-image.png',
    });
  });

  it('should validate required file', async () => {
    const response = await request(server).post('/files').query({ upload_provider: 'aws' });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('File is required for uploading');
  });
});
