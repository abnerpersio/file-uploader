import { Router } from 'express';
import { FileProviderSelector } from '../domain/files/providers/FileProviderSelector';
import { FileUploadUseCase } from '../domain/files/useCases/FIleUploadUseCase';
import { UploadMiddleware } from '../shared/middlewares/UploadMiddleware';

const fileProviderSelector = new FileProviderSelector();
const fileUploadUseCase = new FileUploadUseCase(fileProviderSelector);

export const FileRouter = Router();

FileRouter.post('/', UploadMiddleware, fileUploadUseCase.execute);
