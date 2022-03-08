import { FileProviderSelector } from '../providers/FileProviderSelector';
import { MissingFile } from '../errors/MissingFile';

type FileUpload = {
  file?: Express.Multer.File;
  uploadProvider: string;
  metadata: Record<string, unknown>;
};

export class FileUploadUseCase {
  constructor(private fileProviderSelector: FileProviderSelector) {}

  async execute({ file, uploadProvider, metadata }: FileUpload) {
    if (!file) throw new MissingFile();

    const provider = this.fileProviderSelector.select(uploadProvider);
    const fileUrl = await provider.upload(file, metadata);

    return fileUrl;
  }
}
