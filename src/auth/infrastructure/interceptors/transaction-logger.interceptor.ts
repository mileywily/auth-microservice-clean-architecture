// src/auth/infrastructure/interceptors/transaction-logger.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { tap } from 'rxjs/operators';

@Injectable()
export class TransactionLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const transactionId = randomUUID(); // ID Único de transacción [13]
    req.transactionId = transactionId;
    
    this.logger.log(`[${transactionId}] Request ${req.method} ${req.url}`);
    const now = Date.now();

    return next.handle().pipe(
      tap(() => this.logger.log(`[${transactionId}] Response sent in ${Date.now() - now}ms`)),
    );
  }
}
