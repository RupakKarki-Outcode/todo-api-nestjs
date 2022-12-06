import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './src/config';
import { DataSource } from 'typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DATABASE_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

const dataSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
