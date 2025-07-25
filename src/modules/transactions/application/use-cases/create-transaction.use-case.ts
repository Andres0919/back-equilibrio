import {
  Currency,
  Transaction,
  TransactionType,
} from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

export interface Input {
  id: string;
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;
}

export class CreateTransactionUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  async execute(input: Input): Promise<Transaction> {
    if (input.currency !== Currency.COP) {
      throw new Error('Only COP is supported for now');
    }

    const transaction = new Transaction(input);

    return this.repo.save(transaction);
  }
}
