import { DataSource } from 'typeorm';
import { TransactionTypeOrmEntity } from './src/modules/transactions/infrastructure/entities/transaction.typeorm-entity';
import { CategoryTypeOrmEntity } from './src/modules/categories/infrastructure/entities/category.typeorm-entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'equilibrio',
  entities: [TransactionTypeOrmEntity, CategoryTypeOrmEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
