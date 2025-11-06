import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly config_service: ConfigService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let responseError: HttpExceptionBody = {
      message: 'Internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'INTERNAL_SERVER_ERROR',
    };
    let stack: string | undefined = undefined;

    if (exception instanceof HttpException) {
      const res = exception.getResponse() as HttpExceptionBody;
      status = exception.getStatus();
      message = (res.message as string) || exception.message;
      errorCode = res.error || exception.name;
      responseError = res;
      stack = exception.stack;
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
      error:
        this.config_service.get('NODE_ENV') !== 'production'
          ? {
              response: responseError,
              stack: stack,
            }
          : null,
    });
  }
}
