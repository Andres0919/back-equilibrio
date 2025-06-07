import { Money } from "./Money";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface TransactionProps {
  id: string;
  userId: string;
  categoryId: string;
  amount: Money;
  type: TransactionType;
  description?: string;
  createAt?: Date;
}

export class Transaction {
  public readonly id: string;
  public readonly userId: string;
  public readonly categoryId: string;
  public readonly amount: Money;
  public readonly type: TransactionType;
  public readonly description: string | null | undefined;
  public readonly createAt: Date = new Date();

  constructor(transaction: TransactionProps) {
    this.id = transaction.id;
    this.userId = transaction.userId;
    this.categoryId = transaction.categoryId;
    this.amount = transaction.amount;
    this.type = transaction.type;
    this.description = transaction.description;
    this.createAt = transaction.createAt || new Date();
  }

  isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }
}
