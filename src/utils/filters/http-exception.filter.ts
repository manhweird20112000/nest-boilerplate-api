import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const statusCode = exception.status;

    let resException: any;

    if (statusCode !== HttpStatus.BAD_REQUEST) {
      this.logger.error(exception);
      resException = exception.getResponse();
    } else {
      resException = exception;
    }

    return response.status(statusCode).json(resException);
  }
}
