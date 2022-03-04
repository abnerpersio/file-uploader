import { Request, Response } from 'express';

import { FileSerializer } from './views/FileSerializer';
import { FileClientSelector } from './upload/FileClient';

import { RequestError } from '../shared/errors/RequestError';
import { REQUIRED_FILE_FOR_UPLOAD } from '../shared/constants/messages';

type UploadQueryType = {
  upload_client: string;
};

type UploadBodyType = Record<string, unknown>;

export class FileController {
  async store(req: Request<unknown, unknown, UploadBodyType, UploadQueryType>, res: Response) {
    const { upload_client: uploadClient } = req.query;
    const { file, body } = req;

    if (!file) throw new RequestError(REQUIRED_FILE_FOR_UPLOAD, 422);

    const formattedFileName = FileSerializer.formatName(file.originalname);

    const client = new FileClientSelector(uploadClient).select();

    const url = await client.upload(file, formattedFileName, body);

    res.json({
      success: true,
      data: {
        url,
      },
    });
  }
}
