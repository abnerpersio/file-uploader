import { FileUploadUseCase } from '@domain/files/useCases/file-upload-use-case';

import { FileMetadata } from '../../domain/files/types/file';
import { Provider } from '../../domain/files/types/providers';
import { Controller } from '../adapters/express-adapter';

type Input = FileMetadata & {
  upload_provider: Provider;
  file: Express.Multer.File;
};

export class FileController implements Controller<Input> {
  constructor(private fileUploadUseCase: FileUploadUseCase) {}

  async execute(input: Input) {
    const { upload_provider, file, ...metadata } = input;

    const fileUrl = await this.fileUploadUseCase.execute({
      file,
      metadata,
      uploadProvider: upload_provider,
    });

    return {
      status: 201,
      data: {
        success: true,
        data: {
          url: fileUrl,
        },
      },
    };
  }
}
