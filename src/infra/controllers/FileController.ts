import { FileUploadUseCase } from '../../domain/files/useCases/FIleUploadUseCase';
import { UploadRequest, UploadResponse } from '../types/file-request';

export class FileController {
  constructor(private fileUploadUseCase: FileUploadUseCase) {}

  async upload(req: UploadRequest, res: UploadResponse) {
    const { upload_provider } = req.query;
    const { file, body } = req;

    const fileUrl = await this.fileUploadUseCase.execute({
      file,
      metadata: body,
      uploadProvider: upload_provider,
    });

    res.json({
      success: true,
      data: {
        url: fileUrl,
      },
    });
  }
}
