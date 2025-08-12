import { ValidationError } from '../../../../shared/domain';

export class Money {
  constructor(
    private readonly _amount: number,
    private readonly _currency: string,
  ) {
    this.validateAmount(_amount);
    this.validateCurrency(_currency);
  }

  static create(amount: number, currency: string): Money {
    return new Money(amount, currency);
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  add(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    this.ensureSameCurrency(other);
    return new Money(this._amount - other._amount, this._currency);
  }

  multiply(factor: number): Money {
    if (factor < 0) {
      throw new ValidationError('Factor cannot be negative');
    }
    return new Money(this._amount * factor, this._currency);
  }

  isGreaterThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this._amount > other._amount;
  }

  isLessThan(other: Money): boolean {
    this.ensureSameCurrency(other);
    return this._amount < other._amount;
  }

  equals(other: Money): boolean {
    return (
      other instanceof Money &&
      this._amount === other._amount &&
      this._currency === other._currency
    );
  }

  private validateAmount(amount: number): void {
    if (amount < 0) {
      throw new ValidationError('Amount cannot be negative');
    }
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Amount must be a finite number');
    }
  }

  private validateCurrency(currency: string): void {
    if (!currency || currency.trim().length === 0) {
      throw new ValidationError('Currency is required');
    }
    if (currency.length !== 3) {
      throw new ValidationError('Currency must be 3 characters long');
    }
  }

  private ensureSameCurrency(other: Money): void {
    if (this._currency !== other._currency) {
      throw new ValidationError(
        `Cannot operate with different currencies: ${this._currency} and ${other._currency}`,
      );
    }
  }

  toString(): string {
    return `${this._amount} ${this._currency}`;
  }
}
