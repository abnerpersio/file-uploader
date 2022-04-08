import { Readable } from 'stream';

export function getMockedFile(params: Partial<Express.Multer.File>) {
  return {
    filename: 'test-file-formatted-name.jpeg',
    buffer: Buffer.from([0x62]),
    fieldname: 'jpeg',
    destination: '/path/to/test-file-formatted-name.jpeg',
    originalname: 'test-file-formatted-name.jpeg',
    encoding: 'none',
    mimetype: 'image/jpeg',
    size: 200,
    stream: new Readable(),
    path: '/path/to/test-file-formatted-name.jpeg',
    ...params,
  };
}
