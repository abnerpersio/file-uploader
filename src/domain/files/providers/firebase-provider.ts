import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { firebaseStorage } from '@config/firebase';

import { FileProvider } from './file-provider';

export class FirebaseProvider extends FileProvider {
  static readonly clientName = 'firebase';

  async upload(file: Express.Multer.File, metadata: Record<string, any>): Promise<string | null> {
    const fileName = this.formatFileName(file.originalname);
    const FILE_PATH = `uploads/${fileName}`;

    const fileStorageRef = ref(firebaseStorage, FILE_PATH);

    await uploadBytes(fileStorageRef, file.buffer, metadata);
    const pathLocation = await getDownloadURL(fileStorageRef);

    return pathLocation;
  }
}
