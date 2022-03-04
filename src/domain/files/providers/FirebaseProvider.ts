import { firebaseStorage } from '@config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { FileProvider } from './FileProvider';

export class FirebaseProvider extends FileProvider {
  static clientName = 'firebase';

  async upload(file: Express.Multer.File, metadata: Record<string, any>): Promise<string | null> {
    const fileName = this.formatFileName(file.originalname);
    const FILE_PATH = `uploads/${fileName}`;

    const fileStorageRef = ref(firebaseStorage, FILE_PATH);

    await uploadBytes(fileStorageRef, file.buffer, metadata);
    const pathLocation = await getDownloadURL(fileStorageRef);

    return pathLocation;
  }
}
