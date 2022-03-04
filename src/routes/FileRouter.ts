import { Router } from 'express';
import { FileController } from '../app/FileController';
import { UploadMiddleware } from '../shared/middlewares/UploadMiddleware';

const fileController = new FileController();

export const FileRouter = Router();

FileRouter.post('/:client', UploadMiddleware, fileController.store);
