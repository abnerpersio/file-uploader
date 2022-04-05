import { MissingFile } from '../errors/missing-file';
import { FileProviderSelector } from '../file-provider-selector';
import { FileMetadata } from '../types/file';

type FileUpload = {
  file?: Express.Multer.File;
  uploadProvider: string;
  metadata: FileMetadata;
};

export class FileUploadUseCase {
  constructor(private fileProviderSelector: FileProviderSelector) {}

  async execute({ file, uploadProvider, metadata }: FileUpload) {
    if (!file) throw new MissingFile();

    const provider = this.fileProviderSelector.select(uploadProvider);
    const fileUrl = await provider.upload({ file, metadata });

    return fileUrl;
  }
}
