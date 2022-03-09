import { FileUploadUseCase } from '@domain/files/useCases/FIleUploadUseCase';

import { UploadRequest, UploadResponse } from '../types/file-request';

export class FileController {
  constructor(private fileUploadUseCase: FileUploadUseCase) {}

  upload = async (req: UploadRequest, res: UploadResponse) => {
    const { upload_provider } = req.query;
    const { file, body } = req;

    const fileUrl = await this.fileUploadUseCase.execute({
      file,
      metadata: body,
      uploadProvider: upload_provider,
    });

    res.status(201).json({
      success: true,
      data: {
        url: fileUrl,
      },
    });
  };
}
