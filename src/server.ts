import express from 'express';
import 'express-async-errors';
import { FileRouter } from './infra/routes/FileRouter';
import { CorsMiddleware } from './shared/middlewares/CorsMiddleware';
import { ErrorHandler } from './shared/middlewares/ErrorHandler';

const server = express();

server.use(express.json());

server.use(CorsMiddleware);

server.use('/files', FileRouter);

server.use(ErrorHandler);

export default server;
