# Cambios en la Arquitectura de IDs

## Resumen de Cambios

Se ha implementado un nuevo sistema de identificación dual para las entidades siguiendo los principios de Arquitectura Limpia:

- **`id`**: Número autoincremental para relaciones internas en la base de datos
- **`uid`**: String UUID único para exposición externa en APIs como campo `uid`
- **Generación de UID**: Implementada siguiendo el patrón de inversión de dependencias

## Estructura Actualizada

### Entidad de Dominio (`Transaction`)

```typescript
// Propiedades internas
private readonly id: number; // Autoincremental, para relaciones DB
public readonly uid: string; // UUID para exposición externa

// En la API se expone el uid como "uid" (no como "id")
// La generación de UID es responsabilidad de la capa de aplicación
```

### Servicio de Dominio (`UidGenerator`)

```typescript
// Interfaz en el dominio
export interface UidGenerator {
  generate(): string;
}

// Implementación en infraestructura
@Injectable()
export class UuidGenerator implements UidGenerator {
  generate(): string {
    return uuidv4();
  }
}
```

### Base de Datos (PostgreSQL)

```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,              -- Autoincremental para relaciones
    uid UUID NOT NULL UNIQUE,           -- UUID único para API
    amount DECIMAL(10,2) NOT NULL,
    type transaction_type_enum NOT NULL,
    currency transaction_currency_enum DEFAULT 'COP',
    category_id UUID NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IDX_transactions_uid ON transactions(uid);
```

## Archivos Modificados

### 1. Entidad Base (`DomainEntity`)

- Agregado campo `uid: string`
- Cambiado `id` de `string` a `number`

### 2. Entidad de Dominio (`Transaction`)

- Constructor actualizado para manejar `id` y `uid`
- Método `create()` requiere UID desde capa externa (no genera internamente)
- Validación de UID agregada
- Método `equals()` usa `uid` para comparación
- Método `toPrimitives()` incluye ambos campos

### 3. Servicio de Dominio (`UidGenerator`)

- Interfaz definida en el dominio siguiendo principios de Arquitectura Limpia
- Implementación en infraestructura usando biblioteca UUID
- Inyección de dependencias configurada en providers

### 3. Entidad TypeORM (`TransactionTypeOrmEntity`)

- `id` como `@PrimaryGeneratedColumn()` (autoincremental)
- `uid` como `@Column('uuid', { unique: true })` con índice

### 4. Repositorio TypeORM (`TransactionTypeOrmRepository`)

- Método `findByUid()` agregado
- Método `findById()` redirige a `findByUid()` para compatibilidad
- Mapeos actualizados para manejar ambos campos

### 5. Repositorio In-Memory (`InMemoryTransactionRepository`)

- Simulación de autoincremento para `id`
- Búsquedas por `uid`

### 6. Casos de Uso

- `CreateTransactionUseCase`: Usa `UidGenerator` para generar UID antes de crear entidad
- `GetAllTransactionsUseCase`: Incluye `uid` en DTOs

### 7. Controlador (`TransactionsController`)

- Expone `uid` como `uid` en respuestas de API
- Estructura de respuesta actualizada con nuevo campo

### 8. Migración

- Creada migración para convertir tabla existente
- Preserva datos existentes (UUID actual se convierte en `uid`)

## Beneficios

1. **Rendimiento**: IDs numéricos son más eficientes para JOIN y índices
2. **Seguridad**: UIDs expuestos no revelan información sobre volumen de datos
3. **Escalabilidad**: Mejor rendimiento en bases de datos grandes
4. **Transparencia**: Campo `uid` claramente identificado en la API
5. **Arquitectura Limpia**: Separación de responsabilidades y inversión de dependencias
6. **Flexibilidad**: Permite relaciones eficientes entre entidades

## Migración de Datos

Si ya tienes datos en la base de datos:

1. La migración convertirá automáticamente:
   - `id` actual (UUID) → `uid` nuevo
   - Genera nuevo `id` autoincremental
2. Las APIs ahora exponen el campo `uid` directamente (no como `id`)

## Uso en Desarrollo

```typescript
// Crear transacción (el UID se genera automáticamente)
const transaction = Transaction.create({
  amount: 100000,
  type: TransactionType.INCOME,
  currency: Currency.COP,
  categoryId: 'category-uuid',
  date: new Date(),
  description: 'Salario',
});

// El id interno es numérico, el uid es string
console.log(transaction.id); // 1, 2, 3... (número)
console.log(transaction.uid); // "550e8400-e29b-41d4-a716-446655440000" (UUID)

// En la API se expone el uid directamente
// GET /transactions retorna: { "uid": "550e8400-e29b-41d4-a716-446655440000", ... }
```

## Comandos de Migración

```bash
# En desarrollo (con synchronize: true)
npm run start:dev  # TypeORM sincronizará automáticamente

# En producción (con migraciones)
npm run migration:run  # Ejecuta las migraciones
```
