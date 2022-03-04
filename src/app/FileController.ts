import { Request, Response } from 'express';

import { FileSerializer } from './views/FileSerializer';
import { FileClientSelector } from './upload/FileClient';

import { RequestError } from '../shared/errors/RequestError';
import { REQUIRED_FILE_FOR_UPLOAD } from '../shared/constants/messages';

type ClientParamsType = {
  client: string;
};

export class FileController {
  async store(req: Request<ClientParamsType>, res: Response) {
    const { client } = req.params;
    const { file, body } = req;

    if (!file) throw new RequestError(REQUIRED_FILE_FOR_UPLOAD, 422);

    const formattedFileName = FileSerializer.formatName(file.originalname);

    const uploadClient = new FileClientSelector(client).select();

    const url = await uploadClient.upload(file, formattedFileName, body);

    res.json({
      success: true,
      data: {
        url,
      },
    });
  }
}
