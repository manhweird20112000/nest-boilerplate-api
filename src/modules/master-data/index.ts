import { Module } from '@nestjs/common';
import { MasterDataController } from './controllers';
import { MasterDataService } from '@/modules/master-data/services';
import { IAdapterSecret } from '@/infra/secrets/adapter';
import { SecretsService } from '@/infra/secrets/service';

@Module({
  imports: [],
  controllers: [MasterDataController],
  providers: [
    MasterDataService,
    { provide: IAdapterSecret, useClass: SecretsService },
  ],
})
export class MasterDataHttpModule {}
