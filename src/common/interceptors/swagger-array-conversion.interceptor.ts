import { EnvConfig } from '@/configs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

type RequestBody = Record<string, unknown>;

@Injectable()
export class SwaggerArrayConversion
  implements NestInterceptor<unknown, unknown>
{
  private readonly API_DOCS_URL: string;

  constructor(
    private readonly propertyName: string,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.API_DOCS_URL = `${this.configService.get<EnvConfig['API_BASE_URL']>('API_BASE_URL')}/api-docs`;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    if (this.shouldConvertArray(request)) {
      this.convertSwaggerArrayFormat(request.body as RequestBody);
    }

    return next.handle();
  }

  private shouldConvertArray(request: Request): boolean {
    return (
      request.headers.referer === this.API_DOCS_URL &&
      this.hasProperty(request.body)
    );
  }

  private hasProperty(body: unknown): body is RequestBody {
    return (
      typeof body === 'object' && body !== null && this.propertyName in body
    );
  }

  private convertSwaggerArrayFormat(body: RequestBody): void {
    const propertyValue = body[this.propertyName];

    if (!this.isConvertibleArray(propertyValue)) {
      return;
    }

    const firstElement = propertyValue[0];

    if (this.isCommaSeparatedString(firstElement)) {
      body[this.propertyName] = firstElement.split(',');
    }
  }

  private isConvertibleArray(value: unknown): value is [unknown] {
    return Array.isArray(value) && value.length === 1;
  }

  private isCommaSeparatedString(value: unknown): value is string {
    return typeof value === 'string' && value.includes(',');
  }
}
