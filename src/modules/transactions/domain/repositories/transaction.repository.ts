import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
}
