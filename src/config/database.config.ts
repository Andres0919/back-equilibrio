import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from './entities.config';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'equilibrio',
    entities: ENTITIES,
    synchronize: false, // Always use migrations instead of auto-sync
    logging: process.env.NODE_ENV === 'development',
    migrations: ['dist/migrations/*.js'],
    migrationsRun: process.env.NODE_ENV === 'production',
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  };
});
