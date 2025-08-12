import { ApiProperty } from '@nestjs/swagger';
import {
  Currency,
  TransactionType,
} from '../../domain/entities/transaction.entity';

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Identificador único de la transacción (UID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uid: string;

  @ApiProperty({
    description: 'Monto de la transacción',
    example: 50000,
    minimum: 0.01,
  })
  amount: number;

  @ApiProperty({
    description: 'Tipo de transacción',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  type: TransactionType;

  @ApiProperty({
    description: 'Moneda de la transacción',
    enum: Currency,
    example: Currency.COP,
  })
  currency: Currency;

  @ApiProperty({
    description: 'Identificador de la categoría',
    example: 'salary',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Fecha de la transacción',
    example: '2025-01-15T10:30:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Descripción opcional de la transacción',
    example: 'Pago de salario mensual',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2025-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del registro',
    example: '2025-01-15T10:30:00.000Z',
  })
  updatedAt?: Date;
}
