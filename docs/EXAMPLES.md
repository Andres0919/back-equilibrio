# Ejemplos de Uso de la API Equilibrio

## 🚀 Inicio Rápido

### 1. Iniciar la aplicación

```bash
# Instalar dependencias
pnpm install

# Ejecutar migraciones de base de datos
pnpm run migration:run

# Iniciar en modo desarrollo
pnpm run start:dev
```

### 2. Acceder a la documentación

Abrir en el navegador: http://localhost:3000/api

## 📡 Ejemplos de Requests

### Crear una transacción de ingreso

**POST** `/transactions`

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "type": "INCOME",
    "currency": "COP",
    "categoryId": "salary",
    "date": "2025-01-15T10:30:00.000Z",
    "description": "Pago de salario mensual"
  }'
```

**Response esperado:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 50000,
  "type": "INCOME",
  "currency": "COP",
  "categoryId": "salary",
  "date": "2025-01-15T10:30:00.000Z",
  "description": "Pago de salario mensual"
}
```

### Crear una transacción de gasto

**POST** `/transactions`

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 15000,
    "type": "EXPENSE",
    "currency": "COP",
    "categoryId": "food",
    "date": "2025-01-15T12:00:00.000Z",
    "description": "Almuerzo en restaurante"
  }'
```

### Obtener todas las transacciones

**GET** `/transactions`

```bash
curl -X GET http://localhost:3000/transactions
```

**Response esperado:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "amount": 50000,
    "type": "INCOME",
    "currency": "COP",
    "categoryId": "salary",
    "date": "2025-01-15T10:30:00.000Z",
    "description": "Pago de salario mensual"
  },
  {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "amount": 15000,
    "type": "EXPENSE",
    "currency": "COP",
    "categoryId": "food",
    "date": "2025-01-15T12:00:00.000Z",
    "description": "Almuerzo en restaurante"
  }
]
```

## 🧪 Testing con Swagger UI

### Pasos para probar la API:

1. **Acceder a Swagger UI**: http://localhost:3000/api

2. **Expandir el endpoint POST /transactions**

3. **Hacer clic en "Try it out"**

4. **Usar el siguiente JSON de ejemplo:**

```json
{
  "amount": 25000,
  "type": "EXPENSE",
  "currency": "COP",
  "categoryId": "transport",
  "date": "2025-01-15T08:00:00.000Z",
  "description": "Taxi al trabajo"
}
```

5. **Ejecutar la request** y verificar la respuesta

6. **Probar el endpoint GET** para ver todas las transacciones

## 🔍 Validaciones y Errores

### Ejemplo de error de validación

**Request inválido:**

```json
{
  "amount": -100,
  "type": "INVALID_TYPE",
  "currency": "USD",
  "categoryId": "",
  "date": "invalid-date"
}
```

**Response de error (400 Bad Request):**

```json
{
  "message": [
    "amount must be a positive number",
    "type must be a valid enum value",
    "currency must be a valid enum value",
    "categoryId should not be empty",
    "date must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## 📊 Estructura de Datos

### Tipos de Transacción (TransactionType)

- `INCOME` - Ingreso
- `EXPENSE` - Gasto

### Monedas Soportadas (Currency)

- `COP` - Peso Colombiano

### Categorías de Ejemplo

- `salary` - Salario
- `food` - Alimentación
- `transport` - Transporte
- `entertainment` - Entretenimiento
- `utilities` - Servicios públicos
- `healthcare` - Salud
- `education` - Educación

## 🛠️ Comandos de Desarrollo

```bash
# Compilar el proyecto
pnpm run build

# Ejecutar tests
pnpm run test

# Ejecutar tests e2e
pnpm run test:e2e

# Verificar linting
pnpm run lint

# Formatear código
pnpm run format

# Ver cobertura de tests
pnpm run test:cov
```

## 📝 Notas Adicionales

- Todos los IDs son UUIDs generados automáticamente
- Las fechas deben estar en formato ISO 8601
- Los montos deben ser números positivos
- La descripción es opcional en todas las transacciones
- La documentación Swagger se actualiza automáticamente al modificar los DTOs
