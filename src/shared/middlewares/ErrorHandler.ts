import { NextFunction, Request, Response } from 'express';

export function ErrorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
  console.error('Error Handler', error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
