import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionProviders } from './transactions.providers';
import { TransactionsController } from './presentation';
import { TransactionTypeOrmEntity } from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeOrmEntity])],
  controllers: [TransactionsController],
  providers: [...TransactionProviders],
  exports: [
    // Exportar servicios que otros módulos puedan necesitar
    ...TransactionProviders,
  ],
})
export class TransactionsModule {}
