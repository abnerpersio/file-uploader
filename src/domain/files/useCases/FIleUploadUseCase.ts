import { FileProviderSelector } from '../providers/FileProviderSelector';
import { MissingFile } from '../errors/MissingFile';

import { UploadRequest, UploadResponse } from '../types/request';

export class FileUploadUseCase {
  constructor(private fileProviderSelector: FileProviderSelector) {}

  async execute(req: UploadRequest, res: UploadResponse) {
    const { upload_provider: uploadProvider } = req.query;
    const { file, body } = req;

    if (!file) throw new MissingFile();

    const provider = this.fileProviderSelector.select(uploadProvider);

    const url = await provider.upload(file, body);

    res.json({
      success: true,
      data: {
        url,
      },
    });
  }
}
