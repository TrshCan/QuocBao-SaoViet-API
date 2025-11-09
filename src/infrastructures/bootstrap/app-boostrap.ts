import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import {
  applicationConfig,
  compressionConfig,
  corsOptions,
  envConfig,
  helmetConfig,
} from '@/configs';
import { GlobalExceptionFilter } from '@/common/filters';
import { ResponseTransformInterceptor } from '@/common/interceptors';

import { PrismaService } from '@/modules/shared/prisma';
import { AppModule } from '@/app';

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
    this.initializePrisma();
    this.setGlobalPrefix();
    await this.handleUploadDirectories();
  }

  private configProxy() {
    this.app.set('trust proxy', 1); // to Express knows that header X-Forwarded-* is from proxy
  }

  private configCors() {
    this.app.enableCors(corsOptions);
  }

  private initializeMiddlewares() {
    this.app.use(cookieParser());
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

  private setGlobalPrefix() {
    this.app.setGlobalPrefix('api');
  }

  private initializePrisma() {
    this.app.get(PrismaService).onApplicationBootstrap();
  }

  private async handleUploadDirectories() {
    await import('fs')
      .then((fs) => {
        const uploadDir = [
          'uploads',
          'uploads/avatars',
          'uploads/repair-cases',
          'uploads/repair-cases/model_serial',
          'uploads/repair-cases/repair_form',
          'uploads/repair-cases/before_repair',
          'uploads/repair-cases/after_repair',
          'uploads/repair-cases/parts_components',
          'uploads/repair-cases/warranty_invoice',
        ];
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
    console.log(`[development] - Server is running on port ${envConfig.PORT}`);
    console.log(`[development] - http://localhost:${envConfig.PORT}`);
  }
}
