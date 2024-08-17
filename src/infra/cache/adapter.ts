import {
  RedisCacheKey,
  RedisCacheKeyValue,
  RedisCacheValue,
} from '@/infra/cache/redis/adapter';

export abstract class ICacheAdapter<T = object> {
  client: T;

  abstract isConnect(): Promise<boolean> | boolean;

  abstract connect(): Promise<T> | T;

  abstract setCache<
    TKey extends RedisCacheKey = RedisCacheKey,
    TValue extends RedisCacheValue = RedisCacheValue,
    TConf extends object = object,
  >(key: TKey, value: TValue, options?: TConf): Promise<void> | void;

  abstract getCache<TKey extends RedisCacheKey = RedisCacheKey>(
    key: TKey,
  ): Promise<string> | string;

  abstract deleteCache<TKey extends RedisCacheKey = RedisCacheKey>(
    key: TKey,
  ): Promise<void> | void;

  abstract setMultiCache(data: RedisCacheKeyValue[]): Promise<void> | void;

  abstract setCacheExpire<TKey extends RedisCacheKey = RedisCacheKey>(
    key: TKey,
    miliseconds: number,
  ): Promise<void> | void;
}
