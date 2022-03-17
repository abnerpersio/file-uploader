export type FileMetadata = Record<string, string>;

export type SendFileParams = {
  file: Express.Multer.File;
  fileName: string;
  metadata?: FileMetadata;
};

export type UploadFileParams = {
  file: Express.Multer.File;
  metadata?: FileMetadata;
};
