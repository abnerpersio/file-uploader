import { getMockedFile } from '../../../tests/utils/file';
import { FileProvider } from './file-provider';
import { SendFileParams } from './types/file';

describe(FileProvider.name, () => {
  class TestProvider extends FileProvider {
    async sendFile({ fileName }: SendFileParams) {
      return fileName;
    }
  }

  it('should format file name correctly', async () => {
    const testProvider = new TestProvider();

    const fileName = await testProvider.upload({
      file: getMockedFile({
        filename: 'test-file-formatted-name.jpeg',
        fieldname: 'jpeg',
      }),
      metadata: {},
    });

    expect(fileName).toMatch(/-test-file-formatted-name\.jpeg/);
  });
});
