# Back Equilibrio

API REST para la gestión de transacciones financieras construida con NestJS, TypeORM y PostgreSQL.

## Arquitectura

El proyecto sigue una arquitectura hexagonal (Clean Architecture) con las siguientes capas:

- **Domain**: Entidades de negocio y interfaces de repositorios
- **Application**: Casos de uso y DTOs de aplicación
- **Infrastructure**: Implementaciones de repositorios y entidades de base de datos
- **Presentation**: Controladores y DTOs de presentación

## Tecnologías

- **NestJS**: Framework de Node.js
- **TypeORM**: ORM para TypeScript
- **PostgreSQL**: Base de datos relacional
- **TypeScript**: Lenguaje de programación
- **Jest**: Framework de testing

## Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar base de datos

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Configura las variables de entorno para tu base de datos PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=equilibrio
NODE_ENV=development
```

### 3. Crear base de datos

Asegúrate de que PostgreSQL esté ejecutándose y crea la base de datos:

```sql
CREATE DATABASE equilibrio;
```

### 4. Ejecutar migraciones

```bash
pnpm run migration:run
```

## Scripts disponibles

- `pnpm start`: Inicia la aplicación
- `pnpm start:dev`: Inicia la aplicación en modo desarrollo con hot reload
- `pnpm build`: Construye la aplicación para producción
- `pnpm test`: Ejecuta las pruebas unitarias
- `pnpm test:e2e`: Ejecuta las pruebas end-to-end
- `pnpm migration:generate`: Genera una nueva migración
- `pnpm migration:run`: Ejecuta las migraciones pendientes
- `pnpm migration:revert`: Revierte la última migración

## API Endpoints

### Transacciones

- `GET /transactions`: Obtiene todas las transacciones
- `POST /transactions`: Crea una nueva transacción

### Ejemplo de creación de transacción

```json
{
  "amount": 50000,
  "type": "INCOME",
  "currency": "COP",
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "date": "2025-08-11T10:00:00Z",
  "description": "Salario mensual"
}
```

## Estructura del proyecto

```
src/
├── config/                    # Configuraciones
│   └── typeorm.config.ts     # Configuración de TypeORM
├── migrations/               # Migraciones de base de datos
├── modules/
│   └── transactions/
│       ├── application/      # Casos de uso y DTOs de aplicación
│       ├── domain/          # Entidades y interfaces del dominio
│       ├── infrastructure/  # Implementaciones de repositorios
│       └── presentation/    # Controladores y DTOs de presentación
├── app.module.ts
└── main.ts
```

## Desarrollo

La aplicación utiliza arquitectura hexagonal para mantener una separación clara de responsabilidades:

1. **Domain Layer**: Define las reglas de negocio y las interfaces
2. **Application Layer**: Implementa los casos de uso
3. **Infrastructure Layer**: Implementa las interfaces del dominio con tecnologías específicas
4. **Presentation Layer**: Maneja las peticiones HTTP y las respuestas

Esta arquitectura permite una fácil testabilidad y mantenibilidad del código.

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
