import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCategoriesTable1734537650000 implements MigrationInterface {
  name = 'CreateCategoriesTable1734537650000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uid',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'color',
            type: 'varchar',
            length: '7',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Create indices for better performance
    await queryRunner.createIndex(
      'categories',
      new TableIndex({ name: 'IDX_CATEGORIES_NAME', columnNames: ['name'] }),
    );

    await queryRunner.createIndex(
      'categories',
      new TableIndex({
        name: 'IDX_CATEGORIES_IS_ACTIVE',
        columnNames: ['isActive'],
      }),
    );

    await queryRunner.createIndex(
      'categories',
      new TableIndex({ name: 'IDX_CATEGORIES_UID', columnNames: ['uid'] }),
    );

    // Insert default categories
    await queryRunner.query(`
      INSERT INTO categories (uid, name, description, color, icon, "isActive") VALUES
      ('default-food', 'Food & Dining', 'Restaurants, groceries, and food-related expenses', '#FF6B6B', 'restaurant', true),
      ('default-transport', 'Transportation', 'Gas, public transport, car maintenance', '#4ECDC4', 'directions_car', true),
      ('default-entertainment', 'Entertainment', 'Movies, games, hobbies, and fun activities', '#45B7D1', 'sports_esports', true),
      ('default-health', 'Health & Medical', 'Doctor visits, medications, health insurance', '#96CEB4', 'local_hospital', true),
      ('default-shopping', 'Shopping', 'Clothing, electronics, general purchases', '#FFEAA7', 'shopping_cart', true),
      ('default-utilities', 'Utilities', 'Electricity, water, internet, phone bills', '#DDA0DD', 'build', true),
      ('default-salary', 'Salary', 'Monthly salary and work-related income', '#98D8C8', 'work', true),
      ('default-freelance', 'Freelance', 'Freelance work and side projects income', '#F7DC6F', 'computer', true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
