import { DocumentBuilder, type SwaggerDocumentOptions } from '@nestjs/swagger';

import { AUTHORIZATION } from '@/common/constants';
import { envConfig } from './config-env';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Saoviet API')
  .setDescription('API with auto-generated documentation from Zod schemas')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description:
        'JWT Authorization header using the Bearer scheme for authentication',
      in: 'header',
    },
    AUTHORIZATION,
  )
  .addServer(envConfig.API_BASE_URL, 'Development server')
  .build();

export const swaggerDocumentOptions: SwaggerDocumentOptions = {};
