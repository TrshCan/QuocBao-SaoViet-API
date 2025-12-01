import {
  DocumentBuilder,
  type SwaggerCustomOptions,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Saoviet API')
  .setDescription('API for my application')
  .setVersion('1.0.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .addTag('cats')
  .build();

export const swaggerDocumentOptions: SwaggerDocumentOptions = {};

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};
