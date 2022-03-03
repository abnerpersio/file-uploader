import multer from 'multer';
import { multerConfig } from '../../config/multer';

export const UploadMiddleware = multer(multerConfig).single('file');
