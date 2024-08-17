import { BaseEntity, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { IAdapterRepository } from '@/infra/repository/adapter';
import { DeleteResult, Repository, UpdateResult } from 'typeorm/browser';
import { EntityId } from 'typeorm/repository/EntityId';

export class RepositoryService<T extends BaseEntity>
  implements IAdapterRepository<T>
{
  constructor(readonly repo: Repository<T>) {}

  store(data: T | T[]): Promise<T | T[]> {
    return this.repo.save(data as any);
  }

  findById(
    id: EntityId,
    options?: Omit<FindOneOptions<T>, 'where'> | undefined,
  ): Promise<T> {
    return this.repo.findOne({
      where: { id } as any,
      ...options,
    });
  }

  find<Query>(query: Query): Promise<T[]> {
    return this.repo.find(query);
  }

  findByOne<Query = FindOneOptions<T>>(query: Query): Promise<T> {
    return this.repo.findOne(query);
  }

  updateOne<Query = FindOptionsWhere<T>, Payload = Partial<T>>(
    query: Query,
    payload: Payload,
  ): Promise<UpdateResult> {
    return this.repo.update(query as any, payload as any);
  }

  softDelete<Query = FindOptionsWhere<T>>(query: Query): Promise<DeleteResult> {
    return this.repo.softDelete(query as any)
  }

  hardDelete<Query = FindOptionsWhere<T>>(query: Query): Promise<DeleteResult> {
    return this.repo.delete(query as any)
  }
}
