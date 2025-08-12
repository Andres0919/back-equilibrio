import { v4 as uuidv4 } from 'uuid';
import { UseCase } from '../../../../../shared/application';
import { ValidationError } from '../../../../../shared/domain';
import {
  Transaction,
  TransactionType,
  Currency,
  TransactionRepository,
} from '../../../domain';

export interface CreateTransactionCommand {
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;
}

export interface CreateTransactionResult {
  id: string;
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;
  createdAt: Date;
}

export class CreateTransactionUseCase
  implements UseCase<CreateTransactionCommand, CreateTransactionResult>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    command: CreateTransactionCommand,
  ): Promise<CreateTransactionResult> {
    // Business rules validation
    this.validateBusinessRules(command);

    // Create domain entity
    const transaction = Transaction.create({
      id: this.generateId(),
      amount: command.amount,
      type: command.type,
      currency: command.currency,
      categoryId: command.categoryId,
      date: command.date,
      description: command.description,
    });

    // Persist
    const savedTransaction = await this.transactionRepository.save(transaction);

    // Return result
    return this.mapToResult(savedTransaction);
  }

  private validateBusinessRules(command: CreateTransactionCommand): void {
    if (command.currency !== Currency.COP) {
      throw new ValidationError('Only COP currency is supported currently');
    }

    if (command.date > new Date()) {
      throw new ValidationError('Transaction date cannot be in the future');
    }

    if (command.amount <= 0) {
      throw new ValidationError('Transaction amount must be greater than zero');
    }
  }

  private generateId(): string {
    return uuidv4();
  }

  private mapToResult(transaction: Transaction): CreateTransactionResult {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      currency: transaction.currency,
      categoryId: transaction.categoryId,
      date: transaction.date,
      description: transaction.description,
      createdAt: transaction.createdAt,
    };
  }
}
