import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { useContainer } from 'class-validator';
import { HttpStatus, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpLoggerInterceptor } from '@/utils/interceptors/http-logger.interceptor';
import { HttpExceptionFilter } from '@/utils/filters/http-exception.filter';
import { Helper } from '@/utils/helper';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(logger),
    new I18nValidationExceptionFilter({
      errorFormatter: (errors) => {
        return Helper.formatErrorsValidate(errors);
      },
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  await app.listen(3000);
}
bootstrap();
