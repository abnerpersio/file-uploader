import { Request, Response, Router } from 'express';

export const AppRouter = Router();

AppRouter.get('/health', (_req: Request, res: Response) => {
  return res.json({
    message: 'I"m ok!',
  });
});
