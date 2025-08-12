import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTransactionDto } from '../../modules/transactions/presentation/create-transaction.dto';
import { TransactionResponseDto } from '../../modules/transactions/presentation/dtos/transaction-response.dto';
import { ApiCreate, ApiGetAll } from './api-docs.decorator';

/**
 * Decorador específico para crear transacciones
 */
export function ApiCreateTransaction() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear una nueva transacción',
      description: 'Crea una nueva transacción financiera en el sistema',
    }),
    ApiCreate(CreateTransactionDto, TransactionResponseDto),
  );
}

/**
 * Decorador específico para obtener todas las transacciones
 */
export function ApiGetAllTransactions() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todas las transacciones',
      description:
        'Recupera una lista de todas las transacciones registradas en el sistema',
    }),
    ApiGetAll(TransactionResponseDto),
  );
}
