import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from '@/utils/response-data';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response, @I18n() i18n: I18nContext) {
    return res
      .status(HttpStatus.OK)
      .json(new ResponseData({}, HttpStatus.OK, i18n.t('common.welcome')));
  }
}
