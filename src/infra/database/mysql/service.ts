import { IDatabaseAdapter } from '@/infra/database/adapter';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionType } from '@/infra/database/types';

export class MySQLService implements IDatabaseAdapter {
  getConnection<TOpt extends TypeOrmModuleOptions>({
    url,
  }: ConnectionType): TOpt {
    return {
      type: 'mysql',
      url,
    } as TOpt;
  }
}
