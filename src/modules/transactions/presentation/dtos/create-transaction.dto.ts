import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Currency,
  TransactionType,
} from '../../domain/entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Monto de la transacción en la moneda especificada',
    example: 50000,
    minimum: 0.01,
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Tipo de transacción',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    description: 'Moneda de la transacción',
    enum: Currency,
    example: Currency.COP,
  })
  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;

  @ApiProperty({
    description:
      'Identificador de la categoría a la que pertenece la transacción',
    example: 'salary',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'Fecha y hora de la transacción en formato ISO 8601',
    example: '2025-01-15T10:30:00.000Z',
    type: 'string',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Descripción opcional de la transacción',
    example: 'Pago de salario mensual',
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
