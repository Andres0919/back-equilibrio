import { HttpRequest, HttpResponse } from "../../../../shared/interfaces/http";
import { CreateTransactionUseCase } from "../../application/use-cases/CreateTransactionUseCase";
import { HttpController } from "./httpController";

export class CreateTransactionController implements HttpController {
  constructor(private useCase: CreateTransactionUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { amount, type, userId, categoryId, description } = request.body;

      await this.useCase.execute({
        amount,
        type,
        userId,
        categoryId,
        description,
      });

      return {
        statusCode: 201,
        body: { message: "Transaction created successfully" },
      };
    } catch (error: any) {
      return {
        statusCode: 400,
        body: { error: error.message },
      };
    }
  }
}
