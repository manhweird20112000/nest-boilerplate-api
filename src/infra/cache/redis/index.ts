import { Logger, Module } from '@nestjs/common';
import { SecretsModule } from '@/infra/secrets';
import { ICacheAdapter } from '@/infra/cache/adapter';
import { IAdapterSecret } from '@/infra/secrets/adapter';
import { RedisService } from '@/infra/cache/redis/service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ICacheAdapter,
      useFactory: async ({ REDIS_PORT, REDIS_HOST }: IAdapterSecret) => {
        const logger = new Logger();
        const cacheService = new RedisService(logger, {
          url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
        });
        await cacheService.connect();
        return cacheService;
      },
      inject: [IAdapterSecret],
    },
  ],
  exports: [ICacheAdapter],
})
export class RedisCacheModule {}
