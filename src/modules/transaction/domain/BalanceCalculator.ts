import { Transaction } from "./Transaction";

export class BalanceCalculator {
  static calculate(transactions: Transaction[]): number {
    return transactions.reduce((balance, transaction) => {
      const amount = transaction.amount.getValue();
      return transaction.isIncome() ? balance + amount : balance - amount;
    }, 0);
  }
}
