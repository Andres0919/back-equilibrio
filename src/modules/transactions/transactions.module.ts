import { Module } from '@nestjs/common';
import {
  TransactionRepositoryProvider,
  CreateTransactionUseCaseProvider,
} from './transactions.providers';
import { TransactionsController } from './presentation/transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionRepositoryProvider, CreateTransactionUseCaseProvider],
})
export class TransactionsModule {}
