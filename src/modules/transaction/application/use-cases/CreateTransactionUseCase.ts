import { Money } from "../../domain/Money";
import { Transaction } from "../../domain/Transaction";
import { TransactionRepository } from "../../domain/TransactionRepository";
import { CreateTransactionDTO } from "../dto/CreateTransactionDTO";

export class CreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  async execute(dto: CreateTransactionDTO): Promise<void> {
    const amount = Money.create(dto.amount);

    const transaction = new Transaction({
      id: crypto.randomUUID(),
      userId: dto.userId,
      categoryId: dto.categoryId,
      amount: amount,
      type: dto.type,
      description: dto.description,
      createAt: new Date(),
    });

    await this.repository.save(transaction);
  }
}
