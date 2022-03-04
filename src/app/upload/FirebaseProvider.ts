import { firebaseStorage } from '@config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { IFileProvider } from './FileProvider';

export class FirebaseProvider implements IFileProvider {
  static readonly clientName = 'firebase';

  async upload(
    file: Express.Multer.File,
    fileName: string,
    metadata: Record<string, any>,
  ): Promise<string | null> {
    const FILE_PATH = `uploads/${fileName}`;

    const fileStorageRef = ref(firebaseStorage, FILE_PATH);

    await uploadBytes(fileStorageRef, file.buffer, metadata);
    const pathLocation = await getDownloadURL(fileStorageRef);

    return pathLocation;
  }
}
