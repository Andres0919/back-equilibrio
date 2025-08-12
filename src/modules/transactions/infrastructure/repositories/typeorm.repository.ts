import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionTypeOrmEntity } from '../entities/transaction.typeorm-entity';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionTypeOrmEntity)
    private readonly transactionRepository: Repository<TransactionTypeOrmEntity>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const transactionEntity = this.toTypeOrmEntity(transaction);
    const savedEntity =
      await this.transactionRepository.save(transactionEntity);
    return this.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<Transaction[]> {
    const entities = await this.transactionRepository.find({
      order: { date: 'DESC' },
    });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.transactionRepository.findOne({
      where: { id },
    });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async delete(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  private toTypeOrmEntity(transaction: Transaction): TransactionTypeOrmEntity {
    const entity = new TransactionTypeOrmEntity();
    entity.id = transaction.id;
    entity.amount = transaction.amount;
    entity.type = transaction.type;
    entity.currency = transaction.currency;
    entity.categoryId = transaction.categoryId;
    entity.date = transaction.date;
    entity.description = transaction.description;
    return entity;
  }

  private toDomainEntity(entity: TransactionTypeOrmEntity): Transaction {
    return new Transaction({
      id: entity.id,
      amount: entity.amount,
      type: entity.type,
      currency: entity.currency,
      categoryId: entity.categoryId,
      date: entity.date,
      description: entity.description,
    });
  }
}
