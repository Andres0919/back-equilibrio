import {
  Currency,
  Transaction,
  TransactionType,
} from 'src/modules/transactions/domain/entities/transaction.entity';

export class TransactionDto {
  id: string;
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.amount = transaction.amount;
    this.type = transaction.type;
    this.currency = transaction.currency;
    this.categoryId = transaction.categoryId;
    this.date = transaction.date;
    this.description = transaction.description;
  }
}
