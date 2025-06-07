import { prisma } from "../../../shared/database/PrismaClient";
import { Money } from "../domain/Money";
import { Transaction, TransactionType } from "../domain/Transaction";
import { TransactionRepository } from "../domain/TransactionRepository";

export class PrismaTransactionRepository implements TransactionRepository {
  async save(transaction: any): Promise<void> {
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        userId: transaction.userId,
        amount: transaction.amount.value,
        type: transaction.type,
        category: transaction.category,
        createdAt: transaction.date,
      },
    });
  }

  async findByUserId(userId: string): Promise<any[]> {
    const result = await prisma.transaction.findMany({ where: { userId } });
    return result.map(
      (tx) =>
        new Transaction({
          id: tx.id,
          userId: tx.userId,
          categoryId: tx.category,
          amount: Money.create(Number(tx.amount)),
          type: tx.type as TransactionType,
          description: tx.description || undefined,
          createAt: tx.createdAt,
        })
    );
  }
}
