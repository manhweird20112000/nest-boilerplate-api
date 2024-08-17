import { Injectable } from '@nestjs/common';
import { IAdapterSecret } from '@/infra/secrets/adapter';

@Injectable()
export class MasterDataService {
  constructor(private readonly secret: IAdapterSecret) {}

  getEnv() {
    return this.secret.APP_NAME;
  }
}
