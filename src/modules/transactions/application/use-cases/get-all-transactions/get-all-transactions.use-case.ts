import { UseCase } from '../../../../../shared/application';
import {
  Transaction,
  TransactionType,
  Currency,
  TransactionRepository,
} from '../../../domain';

export interface GetAllTransactionsQuery {
  // Para futuras extensiones de filtros
  limit?: number;
  offset?: number;
}

export interface TransactionDto {
  uid: string; // Expose UID instead of internal ID
  amount: number;
  type: TransactionType;
  currency: Currency;
  categoryId: string;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllTransactionsResult {
  transactions: TransactionDto[];
  total: number;
}

export class GetAllTransactionsUseCase
  implements UseCase<GetAllTransactionsQuery, GetAllTransactionsResult>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    query: GetAllTransactionsQuery = {},
  ): Promise<GetAllTransactionsResult> {
    // Get all transactions from repository
    const transactions = await this.transactionRepository.findAll();

    // Apply pagination if needed
    const paginatedTransactions = this.applyPagination(
      transactions,
      query.limit,
      query.offset,
    );

    // Map to DTOs
    const transactionDtos = paginatedTransactions.map((transaction) =>
      this.mapToDto(transaction),
    );

    return {
      transactions: transactionDtos,
      total: transactions.length,
    };
  }

  private applyPagination(
    transactions: Transaction[],
    limit?: number,
    offset?: number,
  ): Transaction[] {
    if (!limit && !offset) {
      return transactions;
    }

    const start = offset || 0;
    const end = limit ? start + limit : undefined;

    return transactions.slice(start, end);
  }

  private mapToDto(transaction: Transaction): TransactionDto {
    return {
      uid: transaction.uid,
      amount: transaction.amount,
      type: transaction.type,
      currency: transaction.currency,
      categoryId: transaction.categoryId,
      date: transaction.date,
      description: transaction.description,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
