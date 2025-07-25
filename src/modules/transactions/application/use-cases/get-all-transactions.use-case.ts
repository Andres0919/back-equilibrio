import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

export class GetAllTransactionsUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.repo.findAll();
  }
}
