import { UseCase } from '../../../../../shared/application';
import {
  Transaction,
  TransactionRepository,
  TransactionFilters,
} from '../../../domain';

export interface GetFilteredTransactionsRequest {
  filters?: TransactionFilters;
  limit?: number;
  offset?: number;
}

export interface TransactionResponse {
  id: number;
  uid: string;
  amount: number;
  type: string;
  currency: string;
  categoryId: string;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetFilteredTransactionsResponse {
  transactions: TransactionResponse[];
  total: number;
  limit: number;
  offset: number;
}

export class GetFilteredTransactionsUseCase
  implements
    UseCase<GetFilteredTransactionsRequest, GetFilteredTransactionsResponse>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    request: GetFilteredTransactionsRequest,
  ): Promise<GetFilteredTransactionsResponse> {
    const limit = request.limit || 50;
    const offset = request.offset || 0;

    let transactions: Transaction[];
    let total: number;

    if (request.filters && Object.keys(request.filters).length > 0) {
      transactions = await this.transactionRepository.findByFilters(
        request.filters,
        limit,
        offset,
      );
      total = await this.transactionRepository.countByFilters(request.filters);
    } else {
      transactions = await this.transactionRepository.findAllPaginated(
        limit,
        offset,
      );
      const allTransactions = await this.transactionRepository.findAll();
      total = allTransactions.length;
    }

    const transactionResponses: TransactionResponse[] = transactions.map(
      (transaction) => ({
        id: transaction.id,
        uid: transaction.uid,
        amount: transaction.amount,
        type: transaction.type,
        currency: transaction.currency,
        categoryId: transaction.categoryId,
        date: transaction.date,
        description: transaction.description,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      }),
    );

    return {
      transactions: transactionResponses,
      total,
      limit,
      offset,
    };
  }
}
