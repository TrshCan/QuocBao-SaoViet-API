import 'express';

declare global {
  namespace Express {
    interface Request {
      // For file
      file?: Express.Multer.File;
    }
  }
}
