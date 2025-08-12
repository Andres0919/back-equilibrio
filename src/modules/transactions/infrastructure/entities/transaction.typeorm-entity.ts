import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import {
  TransactionType,
  Currency,
} from '../../domain/entities/transaction.entity';

@Entity('transactions')
export class TransactionTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { unique: true })
  @Index()
  uid: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.COP,
  })
  currency: Currency;

  @Column('uuid', { name: 'category_id' })
  categoryId: string;

  @Column('timestamp')
  date: Date;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
