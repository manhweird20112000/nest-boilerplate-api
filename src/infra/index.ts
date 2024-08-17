import { Module } from '@nestjs/common';
import { SecretsModule } from './secrets';
import { LoggerWinstonModule } from './logger';
import { RedisCacheModule } from '@/infra/cache/redis';
import { MysqlModule } from '@/infra/database/mysql';

@Module({
  imports: [SecretsModule, LoggerWinstonModule, MysqlModule, RedisCacheModule],
})
export class InfraModule {}
