import 'reflect-metadata';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

const configService = new ConfigService();
const dataSource: TypeOrmModuleOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  migrationsTableName: 'migration_table',
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/database/entities/*.ts'],
};

export default dataSource;
