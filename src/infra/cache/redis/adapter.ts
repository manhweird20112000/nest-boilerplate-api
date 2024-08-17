export type RedisCacheKey = string | Buffer;
export type RedisCacheValue = string | Buffer;

export type RedisCacheKeyValue = {
  key: RedisCacheKey;
  value: RedisCacheValue;
};
