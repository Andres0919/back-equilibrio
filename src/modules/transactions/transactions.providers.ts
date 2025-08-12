import { Provider } from '@nestjs/common';
import {
  CreateTransactionUseCase,
  GetAllTransactionsUseCase,
} from './application';
import { TransactionRepository } from './domain';
import { TransactionTypeOrmRepository } from './infrastructure';

// Repository Provider
export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export const TransactionRepositoryProvider: Provider = {
  provide: TRANSACTION_REPOSITORY,
  useClass: TransactionTypeOrmRepository,
};

// Use Case Providers
export const CreateTransactionUseCaseProvider: Provider = {
  provide: CreateTransactionUseCase,
  useFactory: (repository: TransactionRepository) => {
    return new CreateTransactionUseCase(repository);
  },
  inject: [TRANSACTION_REPOSITORY],
};

export const GetAllTransactionsUseCaseProvider: Provider = {
  provide: GetAllTransactionsUseCase,
  useFactory: (repository: TransactionRepository) => {
    return new GetAllTransactionsUseCase(repository);
  },
  inject: [TRANSACTION_REPOSITORY],
};

// All providers export
export const TransactionProviders = [
  TransactionRepositoryProvider,
  CreateTransactionUseCaseProvider,
  GetAllTransactionsUseCaseProvider,
];
