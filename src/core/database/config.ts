import { Dialect } from 'sequelize';
import * as dotnev from 'dotenv';

dotnev.config();

module.exports = {
  dialect: 'postgres' as Dialect,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  host: process.env.DATABASE_HOST,
  logging: false,
};
