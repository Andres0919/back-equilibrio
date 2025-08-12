import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  HttpStatus,
} from '@nestjs/swagger';

// Metadata keys
export const API_CONFIG_KEY = 'api_config';

interface ApiConfig {
  operation: {
    summary: string;
    description?: string;
  };
  body?: any;
  response?: {
    type: any;
    status?: HttpStatus;
    description?: string;
  };
  errors?: {
    badRequest?: boolean;
    serverError?: boolean;
  };
}

/**
 * Decorador ultra-simplificado para endpoints
 */
export function ApiEndpoint(config: ApiConfig) {
  const decorators = [
    SetMetadata(API_CONFIG_KEY, config),
    ApiOperation(config.operation),
  ];

  // Body
  if (config.body) {
    decorators.push(ApiBody({ type: config.body }));
  }

  // Response
  if (config.response) {
    decorators.push(
      ApiResponse({
        status: config.response.status || HttpStatus.OK,
        description: config.response.description || 'Operación exitosa',
        type: config.response.type,
      }),
    );
  }

  // Errores estándar
  if (config.errors?.badRequest !== false) {
    decorators.push(
      ApiBadRequestResponse({
        description: 'Datos de entrada inválidos',
      }),
    );
  }

  if (config.errors?.serverError !== false) {
    decorators.push(
      ApiInternalServerErrorResponse({
        description: 'Error interno del servidor',
      }),
    );
  }

  return applyDecorators(...decorators);
}

// Ejemplos de uso específicos
export const CreateTransactionApi = () =>
  ApiEndpoint({
    operation: {
      summary: 'Crear transacción',
      description: 'Crea una nueva transacción financiera',
    },
    body: 'CreateTransactionDto', // Se puede usar string o clase
    response: {
      type: 'TransactionResponseDto',
      status: HttpStatus.CREATED,
      description: 'Transacción creada exitosamente',
    },
  });

export const GetAllTransactionsApi = () =>
  ApiEndpoint({
    operation: {
      summary: 'Obtener transacciones',
      description: 'Lista todas las transacciones',
    },
    response: {
      type: ['TransactionResponseDto'], // Array notation
    },
    errors: {
      badRequest: false, // No incluir error 400 para GET
    },
  });
