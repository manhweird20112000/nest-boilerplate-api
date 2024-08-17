import { IAdapterSecret } from './adapter';
import { ConfigService } from '@nestjs/config';

export class SecretsService extends ConfigService implements IAdapterSecret {
  constructor() {
    super();
  }
  APP_NAME = this.get('APP_NAME');
  APP_PORT = this.get('APP_PORT');
  MYSQL_URI = `mysql://${this.get('DB_USER')}:${this.get(
    'DB_PASSWORD',
  )}@${this.get('DB_HOST')}:${this.get('DB_PORT')}/${this.get('DB_NAME')}`;

  MONGO_URI = `mongodb://${this.get('MONGO_HOST')}:${this.get('MONGO_PORT')}/`;
  MONGO_NAME = this.get('MONGO_NAME');
  MONGO_PASSWORD = this.get('MONGO_PASSWORD');
  MONGO_USER = this.get('MONGO_USER');

  JWT_SECRET = this.get('JWT_SECRET');
  TOKEN_EXPIRATION = this.get('TOKEN_EXPIRATION');
  LOG_LEVEL = this.get('LOG_LEVEL');
  REDIS_HOST = this.get('REDIS_HOST');
  REDIS_PORT = this.get('REDIS_PORT');
  MAXSIZE_IMAGE = this.get('MAXSIZE_IMAGE');
  MAIL_HOST = this.get('MAIL_HOST');
  MAIL_PASSWORD = this.get('MAIL_PASSWORD');
  MAIL_PORT = this.get('MAIL_PORT');
  MAIL_SSL = Boolean(this.get('MAIL_SSL'));
  MAIL_TLS = Boolean(this.get('MAIL_TLS'));
  MAIL_USER = this.get('MAIL_USER');
}
