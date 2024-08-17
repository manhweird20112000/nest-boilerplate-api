import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretsService } from './service';
import { IAdapterSecret } from './adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: IAdapterSecret,
      useClass: SecretsService,
    },
  ],
  exports: [IAdapterSecret],
})
export class SecretsModule {}
