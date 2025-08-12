import { Repository } from '../../../../shared/domain';
import {
  Transaction,
  Currency,
  TransactionType,
} from '../entities/transaction.entity';

export interface TransactionFilters {
  type?: TransactionType;
  currency?: Currency;
  categoryId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  amountMin?: number;
  amountMax?: number;
  description?: string;
}

export interface TransactionRepository extends Repository<Transaction> {
  findByFilters(
    filters: TransactionFilters,
    limit?: number,
    offset?: number,
  ): Promise<Transaction[]>;
  findByCategory(categoryId: string): Promise<Transaction[]>;
  findByDateRange(from: Date, to: Date): Promise<Transaction[]>;
  findAllPaginated(limit: number, offset: number): Promise<Transaction[]>;
  getTotalAmountByType(type: TransactionType): Promise<number>;
  countByCategory(categoryId: string): Promise<number>;
  countByFilters(filters: TransactionFilters): Promise<number>;
}
