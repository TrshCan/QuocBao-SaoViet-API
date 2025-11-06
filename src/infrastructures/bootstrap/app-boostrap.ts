import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import {
  compressionConfig,
  corsOptions,
  envConfig,
  helmetConfig,
} from '../../configs';
import { GlobalExceptionFilter } from '../../common/filters';

import { AppModule } from '../../app.module';

export class AppBootstrap {
  public app: NestExpressApplication;

  public async bootstrap() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
    this.configProxy();
    this.configCors();
    this.initializeMiddlewares();
    this.initializeUploads();
    this.setGlobalPrefix();
    this.initializeGlobalFilters();
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

  private initializeUploads() {
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  private setGlobalPrefix() {
    this.app.setGlobalPrefix('api');
  }

  public async listen() {
    await this.app.listen(envConfig.PORT);
    console.log(`Server is running on port ${envConfig.PORT}`);
    console.log(`http://localhost:${envConfig.PORT}`);
  }
}
