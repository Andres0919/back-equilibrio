import { Provider } from '@nestjs/common';
import {
  CreateTransactionUseCase,
  GetAllTransactionsUseCase,
} from './application';
import { TransactionRepository, UidGenerator } from './domain';
import { TransactionTypeOrmRepository } from './infrastructure';
import { UuidGenerator } from './infrastructure/services/uuid-generator.service';

// Repository Provider
export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export const TransactionRepositoryProvider: Provider = {
  provide: TRANSACTION_REPOSITORY,
  useClass: TransactionTypeOrmRepository,
};

// UID Generator Provider
export const UID_GENERATOR = 'UID_GENERATOR';

export const UidGeneratorProvider: Provider = {
  provide: UID_GENERATOR,
  useClass: UuidGenerator,
};

// Use Case Providers
export const CreateTransactionUseCaseProvider: Provider = {
  provide: CreateTransactionUseCase,
  useFactory: (
    repository: TransactionRepository,
    uidGenerator: UidGenerator,
  ) => {
    return new CreateTransactionUseCase(repository, uidGenerator);
  },
  inject: [TRANSACTION_REPOSITORY, UID_GENERATOR],
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
  UidGeneratorProvider,
  CreateTransactionUseCaseProvider,
  GetAllTransactionsUseCaseProvider,
];
