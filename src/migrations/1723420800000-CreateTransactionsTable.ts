import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1723420800000
  implements MigrationInterface
{
  name = 'CreateTransactionsTable1723420800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "transaction_type_enum" AS ENUM('INCOME', 'EXPENSE')
    `);

    await queryRunner.query(`
      CREATE TYPE "transaction_currency_enum" AS ENUM('COP')
    `);

    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" uuid NOT NULL,
        "amount" numeric(10,2) NOT NULL,
        "type" "transaction_type_enum" NOT NULL,
        "currency" "transaction_currency_enum" NOT NULL DEFAULT 'COP',
        "categoryId" uuid NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "description" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "transaction_currency_enum"`);
    await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
  }
}
