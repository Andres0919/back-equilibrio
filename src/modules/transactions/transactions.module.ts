import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TransactionRepositoryProvider,
  CreateTransactionUseCaseProvider,
  GetAllTransactionsUseCaseProvider,
} from './transactions.providers';
import { TransactionsController } from './presentation/transactions.controller';
import { TransactionTypeOrmEntity } from './infrastructure/entities/transaction.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeOrmEntity])],
  controllers: [TransactionsController],
  providers: [
    TransactionRepositoryProvider,
    CreateTransactionUseCaseProvider,
    GetAllTransactionsUseCaseProvider,
  ],
})
export class TransactionsModule {}
