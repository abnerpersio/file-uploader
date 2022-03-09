import { Router } from 'express';

import { FileProviderSelector } from '@domain/files/providers/FileProviderSelector';
import { FileUploadUseCase } from '@domain/files/useCases/FIleUploadUseCase';
import { UploadMiddleware } from '@shared/middlewares/UploadMiddleware';

import { FileController } from '../controllers/FileController';

const fileProviderSelector = new FileProviderSelector();
const fileUploadUseCase = new FileUploadUseCase(fileProviderSelector);
const fileController = new FileController(fileUploadUseCase);

export const FileRouter = Router();

FileRouter.post('/', UploadMiddleware, fileController.upload);
