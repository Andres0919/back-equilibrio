import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTransactionsIdToAutoIncrement1734537600000
  implements MigrationInterface
{
  name = 'UpdateTransactionsIdToAutoIncrement1734537600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create a new temporary table with the new structure
    await queryRunner.query(`
      CREATE TABLE "transactions_new" (
        "id" SERIAL PRIMARY KEY,
        "uid" uuid NOT NULL UNIQUE,
        "amount" numeric(10,2) NOT NULL,
        "type" "transaction_type_enum" NOT NULL,
        "currency" "transaction_currency_enum" NOT NULL DEFAULT 'COP',
        "categoryId" uuid NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "description" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Create index for uid
    await queryRunner.query(`
      CREATE INDEX "IDX_transactions_uid" ON "transactions_new" ("uid")
    `);

    // Migrate data from old table to new table
    // The old id (uuid) becomes the new uid, and id becomes auto-increment
    await queryRunner.query(`
      INSERT INTO "transactions_new" (uid, amount, type, currency, "categoryId", date, description, "createdAt", "updatedAt")
      SELECT id, amount, type, currency, "categoryId", date, description, "createdAt", "updatedAt"
      FROM "transactions"
    `);

    // Drop the old table
    await queryRunner.query(`DROP TABLE "transactions"`);

    // Rename the new table to the original name
    await queryRunner.query(
      `ALTER TABLE "transactions_new" RENAME TO "transactions"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Create the old table structure
    await queryRunner.query(`
      CREATE TABLE "transactions_old" (
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

    // Migrate data back (uid becomes id)
    await queryRunner.query(`
      INSERT INTO "transactions_old" (id, amount, type, currency, "categoryId", date, description, "createdAt", "updatedAt")
      SELECT uid, amount, type, currency, "categoryId", date, description, "createdAt", "updatedAt"
      FROM "transactions"
    `);

    // Drop the new table
    await queryRunner.query(`DROP TABLE "transactions"`);

    // Rename the old table back
    await queryRunner.query(
      `ALTER TABLE "transactions_old" RENAME TO "transactions"`,
    );
  }
}
