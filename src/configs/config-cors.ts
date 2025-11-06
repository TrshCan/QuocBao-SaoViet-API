import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envConfig } from './config-env';

export const corsOptions: CorsOptions = {
  origin: envConfig.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
