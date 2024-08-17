import { EntityId } from 'typeorm/browser/repository/EntityId';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { DeleteResult, UpdateResult } from 'typeorm/browser';

export abstract class IAdapterRepository<T> {
  abstract findById(
    id: EntityId,
    options?: Omit<FindOneOptions, 'where'>,
  ): Promise<T>;

  abstract store(data: T | []): Promise<T | T[]>;

  abstract findByOne<Query = FindOneOptions<T>>(query: Query): Promise<T>;

  abstract find<Query = FindManyOptions<T>>(query: Query): Promise<T[]>;

  abstract updateOne<Query = FindOptionsWhere<T>, Payload = Partial<T>>(
    query: Query,
    payload: Payload,
  ): Promise<UpdateResult>;

  abstract softDelete<Query = FindOptionsWhere<T>>(
    query: Query,
  ): Promise<DeleteResult>;

  abstract hardDelete<Query = FindOptionsWhere<T>>(
    query: Query,
  ): Promise<DeleteResult>;
}
