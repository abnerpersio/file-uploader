import { Request, Response, Router } from 'express';
import crypto from 'crypto';
import { UploadMiddleware } from '../shared/middlewares/UploadMiddleware';
import { AWS_BUCKET, S3, UploadedFileAWSType } from '../config/aws';

export const FileRouter = Router();

FileRouter.post('/', UploadMiddleware, (req: Request, res: Response) => {
  const upload = S3.upload({
    Bucket: AWS_BUCKET,
    Key: `uploads/${crypto.randomBytes(4).toString('hex')}-${req.file?.originalname}`,
    Body: req.file?.buffer,
    ACL: 'public-read',
    Metadata: req.body,
  });

  upload.send((error: Error, uploaded: UploadedFileAWSType) => {
    if (error) throw error;

    res.json({
      success: true,
      data: {
        url: uploaded.Location,
      },
    });
  });
});
