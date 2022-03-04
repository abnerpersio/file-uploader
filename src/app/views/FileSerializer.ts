import crypto from 'crypto';

export class FileSerializer {
  static formatName(originalFileName: string) {
    const hash = crypto.randomBytes(6).toString('hex');
    return hash + '-' + originalFileName;
  }
}
