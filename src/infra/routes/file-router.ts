import { Router } from 'express';

import { FileProviderSelector } from '@domain/files/file-provider-selector';
import { FileUploadUseCase } from '@domain/files/useCases/file-upload-use-case';
import { UploadMiddleware } from '@shared/middlewares/upload-middleware';

import { ExpressAdapter } from '../adapters/express-adapter';
import { FileController } from '../controllers/file-controller';

const fileProviderSelector = new FileProviderSelector();
const fileUploadUseCase = new FileUploadUseCase(fileProviderSelector);
const fileController = new FileController(fileUploadUseCase);

export const FileRouter = Router();

FileRouter.post('/', UploadMiddleware, new ExpressAdapter(fileController).adapt);
