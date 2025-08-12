import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TransactionTypeOrmEntity } from '../modules/transactions/infrastructure/entities/transaction.typeorm-entity';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'equilibrio',
    entities: [TransactionTypeOrmEntity],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    migrations: ['dist/migrations/*.js'],
    migrationsRun: process.env.NODE_ENV === 'production',
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  };
});
