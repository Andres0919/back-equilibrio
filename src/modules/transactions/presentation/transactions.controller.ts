import { Body, Controller, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  CreateTransactionUseCase,
  Input,
} from '../application/use-cases/create-transaction.use-case';
import { Currency } from '../domain/entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly createTransaction: CreateTransactionUseCase) {}

  @Post()
  async create(@Body() body: Input) {
    const input = {
      id: uuid(),
      amount: body.amount,
      type: body.type,
      currency: body.currency as Currency,
      categoryId: body.categoryId,
      date: new Date(body.date as unknown as string),
      description: body.description,
    };

    return this.createTransaction.execute(input);
  }
}
