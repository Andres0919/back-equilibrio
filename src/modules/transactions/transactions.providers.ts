import { Provider } from '@nestjs/common';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { InMemoryTransactionRepository } from './infrastructure/repositories/in-memory.repository';
import { ITransactionRepository } from './domain/repositories/transaction.repository';

export const TransactionRepositoryProvider: Provider = {
  provide: 'TransactionRepository',
  useClass: InMemoryTransactionRepository,
};

export const CreateTransactionUseCaseProvider: Provider = {
  provide: CreateTransactionUseCase,
  useFactory: (repo: ITransactionRepository) => {
    return new CreateTransactionUseCase(repo);
  },
  inject: ['TransactionRepository'],
};
