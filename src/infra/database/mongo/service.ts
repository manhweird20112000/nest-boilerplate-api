import { IDatabaseAdapter } from '@/infra/database/adapter';
import { ConnectionType } from '@/infra/database/types';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export class MongoDBService implements IDatabaseAdapter {
  getConnection<TConnection extends MongooseModuleOptions>({
    url,
  }: ConnectionType): TConnection {
    return {
      uri: url,
    } as TConnection;
  }
}
