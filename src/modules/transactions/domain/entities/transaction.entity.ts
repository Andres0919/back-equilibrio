export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Currency {
  COP = 'COP',
  // USD = 'USD' // future
}

export interface TransactionProps {
  id: string;
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;
}

export class Transaction {
  public readonly id: string;
  public readonly amount: number;
  public readonly type: TransactionType;
  public readonly currency: Currency;
  public readonly categoryId: string;
  public readonly date: Date;
  public readonly description?: string;

  constructor(props: TransactionProps) {
    if (props.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    this.id = props.id;
    this.amount = props.amount;
    this.type = props.type;
    this.currency = props.currency;
    this.categoryId = props.categoryId;
    this.date = props.date;
    this.description = props.description;
  }
}
