import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'src/config';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DATABASE_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.ts'],
  migrations: ['src/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default OrmConfig;
