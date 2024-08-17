import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { IAdapterSecret } from '@/infra/secrets/adapter';
import { SecretsModule } from '@/infra/secrets';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: ({ APP_NAME }: IAdapterSecret) => {
        return {
          transports: [
            new transports.DailyRotateFile({
              filename: `logs/${APP_NAME.replace(
                ' ',
                '-',
              ).toLowerCase()}-%DATE%.log`,
              level: 'error',
              dirname: './storage/logs/',
              format: format.combine(format.timestamp()),
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false,
              maxFiles: '30d',
              utc: true,
            }),
            new transports.Console({
              format: format.combine(
                format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.ms(),
                format.colorize(),
                format.splat(),
                format.errors({ stack: true }),
                format.cli(),
                utilities.format.nestLike(APP_NAME, {
                  colors: true,
                  prettyPrint: true,
                }),
              ),
            }),
          ],
        };
      },
      imports: [SecretsModule],
      inject: [IAdapterSecret],
    }),
  ],
})
export class LoggerWinstonModule {}
