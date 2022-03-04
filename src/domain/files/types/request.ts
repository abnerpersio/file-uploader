import type { Request, Response } from 'express';

type UploadQuery = {
  upload_provider: string;
};

type UploadBody = Record<string, unknown>;

export type UploadRequest = Request<unknown, unknown, UploadBody, UploadQuery>;

export type UploadResponse = Response<{
  success: boolean;
  data: {
    url: string | null;
  };
}>;
