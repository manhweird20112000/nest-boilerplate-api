import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      `${request.route.path}  ${Object.keys(
        request.route.methods,
      )[0].toUpperCase()}`,
    );
    return next.handle();
  }
}
