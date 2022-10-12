import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

export class ResponseFormat {
  meta: BaseMetaResponseFormat;
  data: Record<string, any>;
}

export class BaseMetaResponseFormat {
  @ApiProperty()
  is_array?: boolean;

  @ApiProperty()
  path?: string;

  @ApiProperty()
  duration?: string;

  @ApiProperty()
  method?: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseFormat>,
  ): Observable<ResponseFormat> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((result) => ({
        data: result.data,
        meta: {
          is_array: Array.isArray(result.data),
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
          ...result.meta,
        },
      })),
    );
  }
}
