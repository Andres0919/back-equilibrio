import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTransactionUseCase,
  CreateTransactionCommand,
  GetAllTransactionsUseCase,
  GetAllTransactionsQuery,
} from '../application';
import { CreateTransactionDto, TransactionResponseDto } from './dtos';
import {
  ApiCreateTransaction,
  ApiGetAllTransactions,
} from '../../../common/decorators';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
  ) {}

  @Post()
  @ApiCreateTransaction()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const command: CreateTransactionCommand = {
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      currency: createTransactionDto.currency,
      categoryId: createTransactionDto.categoryId,
      date: new Date(createTransactionDto.date),
      description: createTransactionDto.description,
    };

    const result = await this.createTransactionUseCase.execute(command);

    return {
      uid: result.uid,
      amount: result.amount,
      type: result.type,
      currency: result.currency,
      categoryId: result.categoryId,
      date: result.date,
      description: result.description,
      createdAt: result.createdAt,
    };
  }

  @Get()
  @ApiGetAllTransactions()
  async findAll(): Promise<TransactionResponseDto[]> {
    const query: GetAllTransactionsQuery = {};
    const result = await this.getAllTransactionsUseCase.execute(query);

    return result.transactions.map((transaction) => ({
      uid: transaction.uid,
      amount: transaction.amount,
      type: transaction.type,
      currency: transaction.currency,
      categoryId: transaction.categoryId,
      date: transaction.date,
      description: transaction.description,
      createdAt: transaction.createdAt,
    }));
  }
}
