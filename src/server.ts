import express from 'express';
import 'express-async-errors';

import { AppRouter } from '@infra/routes/app-router';
import { FileRouter } from '@infra/routes/file-router';
import { CorsMiddleware } from '@shared/middlewares/cors-middleware';
import { ErrorHandler } from '@shared/middlewares/error-handler';

const server = express();

server.use(express.json());

server.use(CorsMiddleware);

server.use('/internal', AppRouter);
server.use('/files', FileRouter);

server.use(ErrorHandler);

export default server;
