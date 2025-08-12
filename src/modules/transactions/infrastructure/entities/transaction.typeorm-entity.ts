import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column('uuid')
  categoryId: string;

  @Column('timestamp')
  date: Date;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
