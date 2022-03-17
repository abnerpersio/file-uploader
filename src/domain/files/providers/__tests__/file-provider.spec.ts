import { Readable } from 'stream';

import { SendFileParams } from '../../types/file';
import { FileProvider } from '../file-provider';

describe(FileProvider.name, () => {
  class TestProvider extends FileProvider {
    async sendFile({ fileName }: SendFileParams) {
      return fileName;
    }
  }

  it('should format file name correctly', async () => {
    const testProvider = new TestProvider();

    const fileName = await testProvider.upload({
      file: {
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
      },
      metadata: {},
    });

    expect(fileName).toMatch(/-test-file-formatted-name\.jpeg/);
  });
});
