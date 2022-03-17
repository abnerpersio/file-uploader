import type { Request, Response } from 'express';

import { FileMetadata } from '../../domain/files/types/file';

type UploadQuery = {
  upload_provider: string;
};

export type UploadBody = FileMetadata;

export type UploadRequest = Request<unknown, unknown, UploadBody, UploadQuery>;

export type UploadResponse = Response<{
  success: boolean;
  data: {
    url: string | null;
  };
}>;
