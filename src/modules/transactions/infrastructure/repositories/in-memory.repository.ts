import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<Transaction> {
    return new Promise((resolve) => {
      this.transactions.push(transaction);
      resolve(transaction);
    });
  }

  async findAll(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      resolve(this.transactions);
    });
  }
}
