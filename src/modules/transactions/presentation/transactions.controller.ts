import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  CreateTransactionUseCase,
  CreateTransactionInput,
} from '../application/use-cases/create-transaction.use-case';
import { GetAllTransactionsUseCase } from '../application/use-cases/get-all-transactions.use-case';
import { Currency } from '../domain/entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly getAllTransactions: GetAllTransactionsUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateTransactionInput) {
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

  @Get()
  async findAll() {
    return this.getAllTransactions.execute();
  }
}
