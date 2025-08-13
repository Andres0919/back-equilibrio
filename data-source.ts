import { DataSource } from 'typeorm';
import { ENTITIES } from './src/config/entities.config';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'equilibrio',
  entities: ENTITIES,
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
