# Arquitectura Hexagonal y Clean Code - Slice Structure

## 🏗️ Estructura Refactorizada

La aplicación ha sido completamente refactorizada siguiendo los principios de **Clean Architecture**, **Arquitectura Hexagonal** y **Slice Structure**.

### 📁 Estructura de Carpetas

```
src/
├── shared/                          # Código compartido entre módulos
│   ├── domain/                      # Abstracciones del dominio
│   │   ├── entities/
│   │   │   └── domain-entity.ts     # Entidad base
│   │   ├── errors/
│   │   │   └── domain-errors.ts     # Errores del dominio
│   │   ├── repositories/
│   │   │   └── base-repository.interface.ts
│   │   └── index.ts
│   ├── application/
│   │   ├── use-case.interface.ts    # Interfaz de casos de uso
│   │   └── index.ts
│   └── index.ts
│
├── common/                          # Utilidades y decoradores compartidos
│   └── decorators/
│       ├── api-docs.decorator.ts    # Decoradores genéricos de API
│       ├── transaction-api.decorator.ts
│       └── index.ts
│
├── modules/                         # Módulos de negocio (slices)
│   ├── transactions/                # Slice de transacciones
│   │   ├── domain/                  # Núcleo del negocio
│   │   │   ├── entities/
│   │   │   │   └── transaction.entity.ts
│   │   │   ├── repositories/
│   │   │   │   └── transaction.repository.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── money.vo.ts
│   │   │   │   ├── transaction-id.vo.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── application/             # Casos de uso
│   │   │   ├── use-cases/
│   │   │   │   ├── create-transaction/
│   │   │   │   │   ├── create-transaction.use-case.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── get-all-transactions/
│   │   │   │   │   ├── get-all-transactions.use-case.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── infrastructure/          # Implementaciones técnicas
│   │   │   ├── entities/
│   │   │   │   └── transaction.typeorm-entity.ts
│   │   │   ├── repositories/
│   │   │   │   ├── typeorm.repository.ts
│   │   │   │   └── in-memory.repository.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── presentation/            # Controllers y DTOs
│   │   │   ├── dtos/
│   │   │   │   ├── create-transaction.dto.ts
│   │   │   │   ├── transaction-response.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── transactions.controller.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── transactions.module.ts   # Configuración del módulo
│   │   ├── transactions.providers.ts # Providers de DI
│   │   └── index.ts                 # API pública del módulo
│   │
│   └── index.ts                     # Exporta todos los módulos
│
├── config/                          # Configuraciones globales
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── swagger.config.ts
│   └── validation.schema.ts
│
├── migrations/                      # Migraciones de base de datos
├── app.module.ts                    # Módulo principal
└── main.ts                          # Punto de entrada
```

## 🎯 Principios Aplicados

### 1. **Clean Architecture**

- **Domain**: Lógica de negocio pura sin dependencias externas
- **Application**: Casos de uso que orquestan la lógica de dominio
- **Infrastructure**: Implementaciones técnicas (bases de datos, APIs externas)
- **Presentation**: Controladores, DTOs y adaptadores de entrada

### 2. **Arquitectura Hexagonal (Ports & Adapters)**

- **Puertos**: Interfaces en el dominio (`TransactionRepository`)
- **Adaptadores**: Implementaciones en infraestructura (`TransactionTypeOrmRepository`)
- **Núcleo**: Lógica de dominio independiente de frameworks

### 3. **Slice Structure**

- Cada módulo es completamente independiente
- Todas las capas están contenidas dentro del slice
- API pública claramente definida
- Fácil de extraer como microservicio

### 4. **Domain Driven Design (DDD)**

- Entidades ricas con comportamiento (`Transaction`)
- Value Objects (`Money`, `TransactionId`)
- Repositorios como abstracciones
- Errores específicos del dominio

## 🔧 Beneficios Obtenidos

### ✅ **Mantenibilidad**

- Separación clara de responsabilidades
- Código fácil de entender y modificar
- Cada capa tiene una única responsabilidad

### ✅ **Testabilidad**

- Lógica de dominio completamente aislada
- Casos de uso fáciles de probar unitariamente
- Mocks simples gracias a las interfaces

### ✅ **Escalabilidad**

- Módulos independientes y desacoplados
- Fácil agregar nuevos módulos (categorías, usuarios, etc.)
- Posibilidad de extraer como microservicios

### ✅ **Flexibilidad**

- Cambio de base de datos sin afectar la lógica
- Fácil agregar nuevos adaptadores (GraphQL, gRPC)
- Reglas de negocio centralizadas

## 📋 Casos de Uso Implementados

### **CreateTransactionUseCase**

```typescript
// Input: CreateTransactionCommand
// Output: CreateTransactionResult
// Responsabilidad: Crear una nueva transacción con validaciones de negocio
```

### **GetAllTransactionsUseCase**

```typescript
// Input: GetAllTransactionsQuery
// Output: GetAllTransactionsResult
// Responsabilidad: Obtener todas las transacciones con paginación opcional
```

## 🧱 Entidades del Dominio

### **Transaction** (Aggregate Root)

- Encapsula las reglas de negocio de las transacciones
- Valida datos de entrada
- Métodos de dominio: `isIncome()`, `isExpense()`, `isSameCategory()`
- Factory method para creación segura

### **Value Objects**

- **Money**: Encapsula monto y moneda con operaciones matemáticas
- **TransactionId**: UUID tipado y validado

## 🔌 Puertos y Adaptadores

### **Puertos (Interfaces)**

- `TransactionRepository`: Define operaciones de persistencia
- `UseCase<TRequest, TResponse>`: Contrato para casos de uso

### **Adaptadores**

- `TransactionTypeOrmRepository`: Implementación con TypeORM
- `TransactionsController`: Adaptador HTTP REST
- `CreateTransactionDto`: Adaptador de entrada HTTP

## 🚀 Extensiones Futuras

### **Nuevos Módulos** (siguiendo la misma estructura)

```
modules/
├── categories/
├── users/
├── budgets/
└── reports/
```

### **Nuevos Casos de Uso**

```typescript
// En transactions/application/use-cases/
├── update-transaction/
├── delete-transaction/
├── find-transaction-by-id/
├── get-transactions-by-category/
└── calculate-balance/
```

### **Nuevos Adaptadores**

```typescript
// Nuevas formas de acceso
├── graphql/           # Adaptador GraphQL
├── grpc/              # Adaptador gRPC
└── messaging/         # Adaptador de eventos
```

## 🔍 Validaciones y Reglas de Negocio

### **En el Dominio (`Transaction.entity.ts`)**

- Monto debe ser mayor a cero
- CategoryId es requerido
- Fecha debe ser válida
- Validación de tipos de transacción

### **En los Casos de Uso**

- Solo moneda COP permitida actualmente
- Fecha no puede ser futura
- Validaciones específicas del contexto

### **En la Presentación (DTOs)**

- Validaciones de formato HTTP
- Transformación de tipos
- Documentación de API

## 📊 Flujo de Datos

```
HTTP Request → Controller → DTO → Use Case → Domain Entity → Repository → Database
                    ↓
HTTP Response ← Controller ← Result ← Use Case ← Domain Entity ← Repository ← Database
```

Esta arquitectura garantiza que:

1. **Las reglas de negocio están en el dominio**
2. **Los casos de uso orquestan las operaciones**
3. **La infraestructura es intercambiable**
4. **La presentación es independiente de la lógica**

¡Tu aplicación ahora sigue las mejores prácticas de arquitectura de software! 🎉
