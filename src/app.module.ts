import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfraModule } from './infra';
import { MainAPIModule } from './modules';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { DatabaseModule } from '@/database';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'vi',
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
        // typesOutputPath: path.join(
        //   __dirname,
        //   '../../generated/i18n.generated.ts',
        // ),
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    InfraModule,
    DatabaseModule,
    MainAPIModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
