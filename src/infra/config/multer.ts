import multer from 'multer';

export const multerConfig: multer.Options = {
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
  },
};
