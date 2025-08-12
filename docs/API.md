# Equilibrio API - Documentación

## Descripción

API RESTful para el manejo de transacciones financieras personales desarrollada con NestJS, TypeScript y PostgreSQL.

## Documentación Swagger/OpenAPI

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api
```

### Características de la documentación:

- **Interfaz interactiva**: Prueba todos los endpoints directamente desde el navegador
- **Esquemas detallados**: Visualiza la estructura completa de requests y responses
- **Ejemplos de uso**: Cada endpoint incluye ejemplos de datos
- **Códigos de respuesta**: Documentación completa de todos los posibles códigos HTTP
- **Validaciones**: Especificaciones de todas las validaciones de entrada

## Endpoints Disponibles

### Transacciones

#### `POST /transactions`

Crea una nueva transacción financiera.

**Parámetros de entrada:**

- `amount` (number): Monto de la transacción (mínimo 0.01)
- `type` (enum): Tipo de transacción (`INCOME` | `EXPENSE`)
- `currency` (enum): Moneda (`COP`)
- `categoryId` (string): Identificador de la categoría
- `date` (string): Fecha en formato ISO 8601
- `description` (string, opcional): Descripción de la transacción

**Ejemplo de request:**

```json
{
  "amount": 50000,
  "type": "INCOME",
  "currency": "COP",
  "categoryId": "salary",
  "date": "2025-01-15T10:30:00.000Z",
  "description": "Pago de salario mensual"
}
```

#### `GET /transactions`

Obtiene todas las transacciones registradas.

**Response:** Array de transacciones con la misma estructura del POST response.

## Modelos de Datos

### TransactionType (Enum)

- `INCOME`: Ingreso
- `EXPENSE`: Gasto

### Currency (Enum)

- `COP`: Peso Colombiano

### TransactionResponseDto

```typescript
{
  id: string;                    // UUID generado automáticamente
  amount: number;                // Monto de la transacción
  type: TransactionType;         // Tipo de transacción
  currency: Currency;            // Moneda
  categoryId: string;            // ID de categoría
  date: Date;                    // Fecha de la transacción
  description?: string;          // Descripción opcional
}
```

## Validaciones

- **amount**: Debe ser un número mayor a 0
- **type**: Debe ser uno de los valores del enum `TransactionType`
- **currency**: Debe ser uno de los valores del enum `Currency`
- **categoryId**: Debe ser una cadena no vacía
- **date**: Debe ser una fecha válida en formato ISO 8601
- **description**: Opcional, debe ser una cadena si se proporciona

## Códigos de Respuesta

- **200**: Operación exitosa (GET)
- **201**: Recurso creado exitosamente (POST)
- **400**: Error en los datos de entrada
- **500**: Error interno del servidor

## Desarrollo Local

1. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**
   Crear archivo `.env` con la configuración de base de datos.

3. **Ejecutar migraciones:**

   ```bash
   pnpm run migration:run
   ```

4. **Iniciar el servidor:**

   ```bash
   pnpm run start:dev
   ```

5. **Acceder a la documentación:**
   Abrir http://localhost:3000/api en el navegador.

## Tecnologías Utilizadas

- **NestJS**: Framework para Node.js
- **TypeScript**: Lenguaje de programación
- **Swagger/OpenAPI**: Documentación de API
- **class-validator**: Validación de DTOs
- **TypeORM**: ORM para base de datos
- **PostgreSQL**: Base de datos

## Arquitectura

El proyecto sigue una arquitectura hexagonal (Clean Architecture) con las siguientes capas:

- **Presentation**: Controladores y DTOs
- **Application**: Casos de uso y DTOs de aplicación
- **Domain**: Entidades y repositorios (interfaces)
- **Infrastructure**: Implementaciones concretas de repositorios

Esta estructura facilita el testing, mantenimiento y escalabilidad del código.
