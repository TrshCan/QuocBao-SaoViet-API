import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import type { ResponseTransform } from '@/types/response-transform';
import type { ResponseController } from '@/types/response-controller';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<ResponseController<T>, ResponseTransform<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseController<T>>,
  ): Observable<ResponseTransform<T>> {
    return next.handle().pipe(
      map((data: ResponseController<T>): ResponseTransform<T> => {
        const getStatusCode = context
          .switchToHttp()
          .getResponse<ResponseTransform<T>>().statusCode;
        return {
          success: true,
          statusCode: getStatusCode || 200,
          message: data.message,
          data: data.metadata,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
