import { PrismaTransactionRepository } from "../../infra/PrismaTransactionRepository";
import { CreateTransactionUseCase } from "../../application/use-cases/CreateTransactionUseCase";
import { CreateTransactionController } from "../controllers/CreateTransactionController";

export class TransactionModule {
  static buildCreateTransactionController() {
    const repository = new PrismaTransactionRepository();
    const useCase = new CreateTransactionUseCase(repository);
    const controller = new CreateTransactionController(useCase);

    return controller;
  }
}
