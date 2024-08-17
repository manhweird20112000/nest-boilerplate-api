import { ConnectionType } from '@/infra/database/types';

export abstract class IDatabaseAdapter {
  abstract getConnection<TConnection>(model: ConnectionType): TConnection;
}
