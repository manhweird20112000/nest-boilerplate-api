import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { MasterDataService } from '@/modules/master-data/services';

@Controller('')
export class MasterDataController {
  constructor(private readonly service: MasterDataService) {}

  @Get('master-data')
  async getMasterData(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, data: this.service.getEnv() });
  }
}
