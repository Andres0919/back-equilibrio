import { DomainEntity, ValidationError } from '../../../../shared/domain';

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
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction extends DomainEntity {
  private constructor(
    id: string,
    private readonly _amount: number,
    private readonly _type: TransactionType,
    private readonly _currency: Currency,
    private readonly _categoryId: string,
    private readonly _date: Date,
    private readonly _description?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  // Factory method
  static create(props: TransactionProps): Transaction {
    this.validateAmount(props.amount);
    this.validateCategoryId(props.categoryId);
    this.validateDate(props.date);

    return new Transaction(
      props.id,
      props.amount,
      props.type,
      props.currency,
      props.categoryId,
      props.date,
      props.description,
      props.createdAt,
      props.updatedAt,
    );
  }

  // Getters
  get amount(): number {
    return this._amount;
  }

  get type(): TransactionType {
    return this._type;
  }

  get currency(): Currency {
    return this._currency;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get date(): Date {
    return this._date;
  }

  get description(): string | undefined {
    return this._description;
  }

  // Business rules
  private static validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new ValidationError('Amount must be greater than zero');
    }
  }

  private static validateCategoryId(categoryId: string): void {
    if (!categoryId || categoryId.trim().length === 0) {
      throw new ValidationError('Category ID is required');
    }
  }

  private static validateDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new ValidationError('Invalid date provided');
    }
  }

  // Domain methods
  isIncome(): boolean {
    return this._type === TransactionType.INCOME;
  }

  isExpense(): boolean {
    return this._type === TransactionType.EXPENSE;
  }

  isSameCategory(categoryId: string): boolean {
    return this._categoryId === categoryId;
  }

  equals(other: Transaction): boolean {
    return (
      other instanceof Transaction &&
      this.id === other.id &&
      this._amount === other._amount &&
      this._type === other._type &&
      this._currency === other._currency &&
      this._categoryId === other._categoryId &&
      this._date.getTime() === other._date.getTime()
    );
  }

  // For serialization/persistence
  toPrimitives(): TransactionProps {
    return {
      id: this.id,
      amount: this._amount,
      type: this._type,
      currency: this._currency,
      categoryId: this._categoryId,
      date: this._date,
      description: this._description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
