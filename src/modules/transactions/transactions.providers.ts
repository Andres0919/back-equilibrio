import { Provider } from '@nestjs/common';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { GetAllTransactionsUseCase } from './application/use-cases/get-all-transactions.use-case';
import { TransactionTypeOrmRepository } from './infrastructure/repositories/typeorm.repository';
import { ITransactionRepository } from './domain/repositories/transaction.repository';

export const TransactionRepositoryProvider: Provider = {
  provide: 'TransactionRepository',
  useClass: TransactionTypeOrmRepository,
};

export const CreateTransactionUseCaseProvider: Provider = {
  provide: CreateTransactionUseCase,
  useFactory: (repo: ITransactionRepository) => {
    return new CreateTransactionUseCase(repo);
  },
  inject: ['TransactionRepository'],
};

export const GetAllTransactionsUseCaseProvider: Provider = {
  provide: GetAllTransactionsUseCase,
  useFactory: (repo: ITransactionRepository) => {
    return new GetAllTransactionsUseCase(repo);
  },
  inject: ['TransactionRepository'],
};
