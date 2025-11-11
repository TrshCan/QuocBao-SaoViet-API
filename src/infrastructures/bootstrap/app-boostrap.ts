import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

import {
  applicationConfig,
  compressionConfig,
  corsOptions,
  envConfig,
  helmetConfig,
  swaggerConfig,
  uploadDir,
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
    const config = new DocumentBuilder()
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

    const documentFactory = () => {
      const document = SwaggerModule.createDocument(
        this.app,
        config,
        swaggerConfig,
      );
      const yamlDocument = this.loadOpenApiYaml();

      if (yamlDocument) {
        this.mergeOpenApiDocument(document, yamlDocument);
      }

      return document;
    };

    SwaggerModule.setup('api', this.app, documentFactory);
  }

  private loadOpenApiYaml(): unknown {
    try {
      const yamlPath = path.join(
        process.cwd(),
        'documents',
        'openapi',
        'openapi.yaml',
      );

      if (!fs.existsSync(yamlPath)) {
        console.warn(
          `[${envConfig.NODE_ENV}] - AppBootstrap - OpenAPI YAML file not found at: ${yamlPath}`,
        );
        return null;
      }

      const fileContents = fs.readFileSync(yamlPath, 'utf8');
      const yamlDocument = yaml.load(fileContents);

      console.log(
        `[${envConfig.NODE_ENV}] - AppBootstrap - OpenAPI YAML loaded successfully`,
      );

      return yamlDocument;
    } catch (error) {
      console.error(
        `[${envConfig.NODE_ENV}] - AppBootstrap - Error loading OpenAPI YAML:`,
        error,
      );
      return null;
    }
  }

  private mergeOpenApiDocument(
    document: OpenAPIObject,
    yamlDocument: unknown,
  ): void {
    if (!yamlDocument || typeof yamlDocument !== 'object') {
      return;
    }

    const yamlDoc = yamlDocument as Record<string, unknown>;

    // Merge components/schemas from YAML into the document
    if (yamlDoc.components && typeof yamlDoc.components === 'object') {
      const yamlComponents = yamlDoc.components as Record<string, unknown>;

      if (!document.components) {
        document.components = {};
      }

      const docComponents = document.components as Record<string, unknown>;

      // Merge schemas
      if (
        yamlComponents.schemas &&
        typeof yamlComponents.schemas === 'object'
      ) {
        if (!docComponents.schemas) {
          docComponents.schemas = {};
        }

        const docSchemas = docComponents.schemas as Record<string, unknown>;
        const yamlSchemas = yamlComponents.schemas as Record<string, unknown>;

        Object.assign(docSchemas, yamlSchemas);
      }

      // Merge other components (responses, parameters, examples, etc.)
      const componentKeys = [
        'responses',
        'parameters',
        'examples',
        'requestBodies',
        'headers',
        'securitySchemes',
        'links',
        'callbacks',
      ];

      componentKeys.forEach((key) => {
        if (yamlComponents[key] && typeof yamlComponents[key] === 'object') {
          if (!docComponents[key]) {
            docComponents[key] = {};
          }

          const docComponent = docComponents[key] as Record<string, unknown>;
          const yamlComponent = yamlComponents[key] as Record<string, unknown>;

          Object.assign(docComponent, yamlComponent);
        }
      });
    }

    // Merge paths if needed
    if (yamlDoc.paths && typeof yamlDoc.paths === 'object') {
      if (!document.paths) {
        document.paths = {};
      }

      const docPaths = document.paths as Record<string, unknown>;
      const yamlPaths = yamlDoc.paths as Record<string, unknown>;

      Object.assign(docPaths, yamlPaths);
    }

    // Merge tags if needed
    if (Array.isArray(yamlDoc.tags)) {
      if (!Array.isArray(document.tags)) {
        document.tags = [];
      }

      const docTags = document.tags as unknown[];
      const yamlTags = yamlDoc.tags as unknown[];
      docTags.push(...yamlTags);
    }

    // Merge servers if needed
    if (Array.isArray(yamlDoc.servers)) {
      if (!Array.isArray(document.servers)) {
        document.servers = [];
      }

      const docServers = document.servers as unknown[];
      const yamlServers = yamlDoc.servers as unknown[];
      docServers.push(...yamlServers);
    }
  }

  private initializePrisma() {
    this.app.get(PrismaService).onApplicationBootstrap();
  }

  private setGlobalPrefix() {
    this.app.setGlobalPrefix('api');
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
