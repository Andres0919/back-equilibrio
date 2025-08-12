import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

// Esquemas de error reutilizables
const ERROR_SCHEMAS = {
  badRequest: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: { type: 'string' },
        example: ['Validation error message'],
      },
      error: { type: 'string', example: 'Bad Request' },
      statusCode: { type: 'number', example: 400 },
    },
  },
  internalServerError: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Internal server error' },
      error: { type: 'string', example: 'Internal Server Error' },
      statusCode: { type: 'number', example: 500 },
    },
  },
};

interface ApiDocOptions {
  summary: string;
  description?: string;
  bodyType?: Type<unknown>;
  responseType?: Type<unknown> | [Type<unknown>];
  responseStatus?: HttpStatus;
  includeBadRequest?: boolean;
  includeServerError?: boolean;
}

/**
 * Decorador personalizado que aplica múltiples decoradores de Swagger
 * para simplificar la documentación de endpoints
 */
export function ApiDocs(options: ApiDocOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  // Respuesta exitosa
  if (options.responseType) {
    decorators.push(
      ApiResponse({
        status: options.responseStatus || HttpStatus.OK,
        description: 'Operación exitosa',
        type: options.responseType,
      }),
    );
  }

  // Body del request
  if (options.bodyType) {
    decorators.push(
      ApiBody({
        type: options.bodyType,
      }),
    );
  }

  // Error 400 (Bad Request)
  if (options.includeBadRequest !== false) {
    decorators.push(
      ApiBadRequestResponse({
        description: 'Datos de entrada inválidos',
        schema: ERROR_SCHEMAS.badRequest,
      }),
    );
  }

  // Error 500 (Internal Server Error)
  if (options.includeServerError !== false) {
    decorators.push(
      ApiInternalServerErrorResponse({
        description: 'Error interno del servidor',
        schema: ERROR_SCHEMAS.internalServerError,
      }),
    );
  }

  return applyDecorators(...decorators);
}

/**
 * Decorador específico para endpoints de creación
 */
export function ApiCreate(
  bodyType: Type<unknown>,
  responseType: Type<unknown>,
) {
  return ApiDocs({
    summary: 'Crear recurso',
    bodyType,
    responseType,
    responseStatus: HttpStatus.CREATED,
  });
}

/**
 * Decorador específico para endpoints de obtención de lista
 */
export function ApiGetAll(responseType: Type<unknown>) {
  return ApiDocs({
    summary: 'Obtener todos los recursos',
    responseType: [responseType],
    includeBadRequest: false,
  });
}

/**
 * Decorador específico para endpoints de obtención por ID
 */
export function ApiGetById(responseType: Type<unknown>) {
  return ApiDocs({
    summary: 'Obtener recurso por ID',
    responseType,
    includeBadRequest: false,
  });
}
