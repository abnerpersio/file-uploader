import { MissingFile } from '../missing-file';

describe(MissingFile.name, () => {
  it('should create a missing file error', () => {
    const error = new MissingFile();

    expect(error.statusCode).toBe(422);
    expect(() => {
      throw error;
    }).toThrow('File is required for uploading');
  });
});
