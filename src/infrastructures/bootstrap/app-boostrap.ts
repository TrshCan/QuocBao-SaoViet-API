import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import path, { join } from 'path';
import * as fs from 'fs';

import {
  applicationConfig,
  compressionConfig,
  corsOptions,
  envConfig,
  helmetConfig,
  swaggerConfig,
  swaggerDocumentOptions,
  uploadDir,
} from '@/configs';
import { GlobalExceptionFilter } from '@/common/filters';
import { ResponseTransformInterceptor } from '@/common/interceptors';

import { AppModule } from '@/app';
import {
  loadOpenApiYaml,
  mergeOpenApiDocument,
  SwaggerUI,
} from '../documentation';

export class AppBootstrap {
  public app: NestExpressApplication;

  public async bootstrap() {
    this.app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      applicationConfig,
    );
    this.configProxy();
    this.configCors();
    this.initializeMiddlewares();
    this.initializeUploads();
    this.initializeGlobalFilters();
    this.initializeGlobalInterceptors();
    this.setGlobalPrefix();
    this.initializeOpenapi();
    await this.handleUploadDirectories();
  }

  private configProxy() {
    this.app.set(
      'trust proxy',
      envConfig.NODE_ENV === 'production' ? 'loopback' : true,
    ); // to Express knows that header X-Forwarded-* is from proxy
  }

  private configCors() {
    this.app.enableCors(corsOptions);
  }

  private initializeMiddlewares() {
    // TODO: cookie-parser MUST be registered before CSRF protection
    // This allows csrf-csrf to read CSRF tokens from cookies
    this.app.use(cookieParser());

    // const {
    // doubleCsrfProtection, // Default CSRF protection middleware
    // Available utilities (not used here, but can be used in routes):
    // - generateCsrfToken: Generate CSRF tokens in routes
    // - validateRequest: Custom validation middleware
    // - invalidCsrfTokenError: Custom error handling
    // } = doubleCsrf(doubleCsrfOptions);

    // Apply CSRF protection to all routes (except GET, HEAD, OPTIONS)
    // this.app.use(doubleCsrfProtection);
    this.app.use(helmet(helmetConfig));
    this.app.use(compression(compressionConfig));
    this.app.use(express.json({ limit: '20mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '20mb' }));
  }

  private initializeGlobalFilters() {
    this.app.useGlobalFilters(
      new GlobalExceptionFilter(this.app.get(ConfigService)),
    );
  }

  private initializeGlobalInterceptors() {
    this.app.useGlobalInterceptors(new ResponseTransformInterceptor());
  }

  private initializeUploads() {
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  private initializeOpenapi() {
    // Serve static assets for Swagger custom JS
    this.app.useStaticAssets(join(__dirname, '..', '..', 'served'), {
      prefix: '/api/',
    });

    const documentFactory = () => {
      const document = SwaggerModule.createDocument(
        this.app,
        swaggerConfig,
        swaggerDocumentOptions,
      );

      cleanupOpenApiDoc(document);

      fs.writeFileSync(
        'documents/postman/SaoViet.postman_collection.json',
        JSON.stringify(document),
      ); // <-- Save document to json file

      const yamlDocument = loadOpenApiYaml();

      if (yamlDocument) {
        mergeOpenApiDocument(document, yamlDocument);
      }

      return document;
    };

    const swaggerUI = new SwaggerUI(envConfig.API_BASE_URL);

    SwaggerModule.setup(
      'api-docs',
      this.app,
      documentFactory,
      swaggerUI.customOptions,
    );
  }

  private setGlobalPrefix() {
    this.app.setGlobalPrefix('api');
    this.app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: VERSION_NEUTRAL,
    });
  }

  private async handleUploadDirectories() {
    await import('fs')
      .then((fs) => {
        uploadDir.forEach((dir) => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(
              `[${envConfig.NODE_ENV}] - AppBootstrap - Created upload directory: ${dir}`,
            );
          }
        });
      })
      .catch((error) => {
        console.error(
          `[${envConfig.NODE_ENV}] - AppBootstrap - Error creating upload directories`,
          error,
        );
      });
  }

  public async listen() {
    // Starts listening for shutdown hooks
    this.app.enableShutdownHooks();
    await this.app.listen(envConfig.PORT);
    console.log(
      `[${envConfig.NODE_ENV}] - Server is running on port ${envConfig.PORT}`,
    );
    console.log(`[${envConfig.NODE_ENV}] - http://localhost:${envConfig.PORT}`);
  }
}
