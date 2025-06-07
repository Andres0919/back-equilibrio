import { TransactionType } from "../../domain/Transaction";

export interface CreateTransactionDTO {
  userId: string;
  categoryId: string;
  amount: number; // This should be a positive number
  type: TransactionType;
  description: string;
}
