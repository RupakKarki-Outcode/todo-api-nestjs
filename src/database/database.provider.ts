import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService<ConfigType>) => {
      const sequelize = new Sequelize({
        dialect: configService.get('DATABASE_TYPE'),
        database: configService.get('POSTGRES_DB'),
        password: configService.get('POSTGRES_PASSWORD'),
        username: configService.get('POSTGRES_USER'),
        host: configService.get('DATABASE_HOST'),
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
