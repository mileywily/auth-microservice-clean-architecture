// src/auth/infrastructure/interceptors/exclude-password.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data => {
        // Remueve recursivamente propiedades 'passwordHash' de las respuestas
        const sanitize = (obj: any) => {
            if (!obj || typeof obj !== 'object') return obj;
            delete obj.passwordHash;
            Object.keys(obj).forEach(key => sanitize(obj[key]));
            return obj;
        };
        return sanitize(data);
      }),
    );
  }
}
