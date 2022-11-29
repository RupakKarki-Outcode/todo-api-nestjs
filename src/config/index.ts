import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  SWAGGER_ROUTE: process.env.SWAGGER_ROUTE,
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX,
  API_VERSION: process.env.API_VERSION,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
