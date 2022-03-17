import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { firebaseStorage } from '@config/firebase';

import { SendFileParams } from '../types/file';
import { FileProvider } from './file-provider';

export class FirebaseProvider extends FileProvider {
  static readonly clientName = 'firebase';

  async sendFile({ file, fileName, metadata }: SendFileParams): Promise<string | null> {
    const FILE_PATH = `uploads/${fileName}`;

    const fileStorageRef = ref(firebaseStorage, FILE_PATH);

    await uploadBytes(fileStorageRef, file.buffer, metadata);

    return await getDownloadURL(fileStorageRef);
  }
}
