import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IAdapterSecret } from '@/infra/secrets/adapter';
import { MongoDBService } from '@/infra/database/mongo/service';
import { SecretsModule } from '@/infra/secrets';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: ({
        MONGO_URI,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_NAME,
      }: IAdapterSecret) => {
        const connection = new MongoDBService().getConnection({
          url: MONGO_URI,
        });
        return {
          ...connection,
          connectTimeoutMS: 5000,
          lazyConnection: true,
          auth: {
            username: MONGO_USER,
            password: MONGO_PASSWORD,
          },
          dbName: MONGO_NAME,
          authMechanism: 'DEFAULT',
          authSource: 'admin',
        };
      },
      imports: [SecretsModule],
      inject: [IAdapterSecret],
    }),
  ],
})
export class MongoDBModule {}
