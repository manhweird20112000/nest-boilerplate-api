import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICacheAdapter } from '@/infra/cache/adapter';
import { CacheKey, CacheKeyValue, CacheValue } from '@/infra/cache/types';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RedisService implements Partial<ICacheAdapter<RedisClientType>> {
  client: RedisClientType;
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
    private readonly options: RedisClientOptions,
  ) {
    this.client = createClient(this.options) as RedisClientType;
  }

  async isConnect(): Promise<boolean> {
    const ping = await this.client.ping();
    if (ping !== 'PONG') this.logger.error('Redis disconnected.');
    return ping !== 'PONG';
  }

  async connect(): Promise<RedisClientType> {
    try {
      await this.client.connect();
      this.logger.log('Redis connected.');
      return this.client;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async setCache(
    key: CacheKey,
    value: CacheValue,
    options: unknown,
  ): Promise<void> {
    await this.client.set(key, value, options);
  }

  async getCache(key: CacheKey): Promise<string> {
    return await this.client.get(key);
  }

  async deleteCache(key: CacheKey): Promise<void> {
    await this.client.del(key);
  }

  async setMultiCache(redisList: CacheKeyValue[]): Promise<void> {
    const multi = this.client.multi();
    redisList.forEach((item) => {
      multi.rPush(item.key, item.value);
    });

    await multi.exec();
  }

  async setCacheExpire(key: CacheKey, miliseconds: number): Promise<void> {
    await this.client.pExpire(key, miliseconds);
  }
}
