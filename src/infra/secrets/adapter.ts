export abstract class IAdapterSecret {
  APP_NAME: string;
  APP_PORT: string;

  MYSQL_URI: string;

  MONGO_URI: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_NAME: string;

  JWT_SECRET: string;

  TOKEN_EXPIRATION: string;

  REDIS_PORT: string;

  REDIS_HOST: string;

  LOG_LEVEL: string;

  MAXSIZE_IMAGE: string;

  MAIL_HOST: string;
  MAIL_PORT: string;
  MAIL_SSL: boolean;
  MAIL_TLS: boolean;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
}
