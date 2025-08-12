import {
  TransactionRepository,
  TransactionFilters,
} from '../../domain/repositories/transaction.repository';
import {
  Transaction,
  TransactionType,
} from '../../domain/entities/transaction.entity';

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];
  private nextId: number = 1;

  async save(transaction: Transaction): Promise<Transaction> {
    return new Promise((resolve) => {
      // Simulate auto-increment id if not set
      if (!transaction.id || transaction.id === 0) {
        const newTransaction = Transaction.create({
          ...transaction.toPrimitives(),
          id: this.nextId++,
        });
        this.transactions.push(newTransaction);
        resolve(newTransaction);
      } else {
        // Update existing transaction
        const index = this.transactions.findIndex(
          (t) => t.id === transaction.id,
        );
        if (index >= 0) {
          this.transactions[index] = transaction;
        } else {
          this.transactions.push(transaction);
        }
        resolve(transaction);
      }
    });
  }

  async findAll(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      resolve([...this.transactions]);
    });
  }

  async findById(id: string): Promise<Transaction | null> {
    return new Promise((resolve) => {
      const transaction = this.transactions.find((t) => t.uid === id);
      resolve(transaction || null);
    });
  }

  async findByUid(uid: string): Promise<Transaction | null> {
    return this.findById(uid);
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      const index = this.transactions.findIndex((t) => t.uid === id);
      if (index >= 0) {
        this.transactions.splice(index, 1);
      }
      resolve();
    });
  }

  async findByFilters(filters: TransactionFilters): Promise<Transaction[]> {
    return new Promise((resolve) => {
      let filtered = [...this.transactions];

      if (filters.type) {
        filtered = filtered.filter((t) => t.type === filters.type);
      }

      if (filters.currency) {
        filtered = filtered.filter((t) => t.currency === filters.currency);
      }

      if (filters.categoryId) {
        filtered = filtered.filter((t) => t.categoryId === filters.categoryId);
      }

      if (filters.dateFrom) {
        filtered = filtered.filter((t) => t.date >= filters.dateFrom!);
      }

      if (filters.dateTo) {
        filtered = filtered.filter((t) => t.date <= filters.dateTo!);
      }

      if (filters.amountMin !== undefined) {
        filtered = filtered.filter((t) => t.amount >= filters.amountMin!);
      }

      if (filters.amountMax !== undefined) {
        filtered = filtered.filter((t) => t.amount <= filters.amountMax!);
      }

      resolve(filtered);
    });
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    return new Promise((resolve) => {
      const filtered = this.transactions.filter(
        (t) => t.categoryId === categoryId,
      );
      resolve(filtered);
    });
  }

  async findByDateRange(from: Date, to: Date): Promise<Transaction[]> {
    return new Promise((resolve) => {
      const filtered = this.transactions.filter(
        (t) => t.date >= from && t.date <= to,
      );
      resolve(filtered);
    });
  }

  async getTotalAmountByType(type: TransactionType): Promise<number> {
    return new Promise((resolve) => {
      const total = this.transactions
        .filter((t) => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0);
      resolve(total);
    });
  }

  async countByCategory(categoryId: string): Promise<number> {
    return new Promise((resolve) => {
      const count = this.transactions.filter(
        (t) => t.categoryId === categoryId,
      ).length;
      resolve(count);
    });
  }
}
