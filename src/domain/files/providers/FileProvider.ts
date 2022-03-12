import crypto from 'crypto';

export abstract class FileProvider {
  formatFileName(originalFileName: string) {
    const hash = crypto.randomBytes(6).toString('hex');
    return `${hash}-${originalFileName}`;
  }

  abstract upload(
    file: Express.Multer.File,
    metadata?: Record<string, any>,
  ): Promise<string | null>;
}
