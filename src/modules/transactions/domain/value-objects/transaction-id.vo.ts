import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from '../../../../shared/domain';

export class TransactionId {
  constructor(private readonly _value: string) {
    this.validate(_value);
  }

  static create(value: string): TransactionId {
    return new TransactionId(value);
  }

  static generate(): TransactionId {
    return new TransactionId(uuidv4());
  }

  get value(): string {
    return this._value;
  }

  equals(other: TransactionId): boolean {
    return other instanceof TransactionId && this._value === other._value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new ValidationError('Transaction ID cannot be empty');
    }

    // UUID v4 validation
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new ValidationError('Transaction ID must be a valid UUID v4');
    }
  }

  toString(): string {
    return this._value;
  }
}
