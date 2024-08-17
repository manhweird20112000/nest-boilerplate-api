import { Module } from '@nestjs/common';
import { MasterDataHttpModule } from './master-data';

@Module({
  imports: [MasterDataHttpModule],
})
export class MainAPIModule {}
