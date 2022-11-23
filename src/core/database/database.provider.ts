import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/user.entity';
import { ORM_PROVIDER } from '../constants';

export const databaseProviders = [
  {
    provide: ORM_PROVIDER,
    useFactory: async (configService: ConfigService<ConfigType>) => {
      const sequelize = new Sequelize({
        dialect: configService.get('DATABASE_TYPE'),
        database: configService.get('POSTGRES_DB'),
        password: configService.get('POSTGRES_PASSWORD'),
        username: configService.get('POSTGRES_USER'),
        host: configService.get('DATABASE_HOST'),
        logging: false,
      });
      sequelize.addModels([User]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
