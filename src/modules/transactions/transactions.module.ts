import { Module } from '@nestjs/common';
import {
  TransactionRepositoryProvider,
  CreateTransactionUseCaseProvider,
  GetAllTransactionsUseCaseProvider,
} from './transactions.providers';
import { TransactionsController } from './presentation/transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionRepositoryProvider,
    CreateTransactionUseCaseProvider,
    GetAllTransactionsUseCaseProvider,
  ],
})
export class TransactionsModule {}
