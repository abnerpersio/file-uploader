import crypto from 'crypto';

import { SendFileParams, UploadFileParams } from './types/file';

export abstract class FileProvider {
  abstract sendFile(params: SendFileParams): Promise<string | null>;

  upload({ file, metadata }: UploadFileParams) {
    const formattedFileName = this.formatFileName(file.originalname);
    return this.sendFile({ file, fileName: formattedFileName, metadata });
  }

  private formatFileName(originalFileName: string) {
    const hash = crypto.randomBytes(8).toString('hex');
    return `${hash}-${originalFileName}`;
  }
}
