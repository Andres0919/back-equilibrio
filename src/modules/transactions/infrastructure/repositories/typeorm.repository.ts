import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  Transaction,
  TransactionRepository,
  TransactionFilters,
  TransactionType,
} from '../../domain';
import { TransactionTypeOrmEntity } from '../entities/transaction.typeorm-entity';

@Injectable()
export class TransactionTypeOrmRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionTypeOrmEntity)
    private readonly ormRepository: Repository<TransactionTypeOrmEntity>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const transactionEntity = this.toTypeOrmEntity(transaction);
    const savedEntity = await this.ormRepository.save(transactionEntity);
    return this.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<Transaction[]> {
    const entities = await this.ormRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
    });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.ormRepository.findOne({
      where: { uid: id },
    });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ uid: id });
  }

  async findByFilters(
    filters: TransactionFilters,
    limit?: number,
    offset?: number,
  ): Promise<Transaction[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('transaction');

    if (filters.type) {
      queryBuilder.andWhere('transaction.type = :type', { type: filters.type });
    }

    if (filters.currency) {
      queryBuilder.andWhere('transaction.currency = :currency', {
        currency: filters.currency,
      });
    }

    if (filters.categoryId) {
      queryBuilder.andWhere('transaction.categoryId = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters.dateFrom && filters.dateTo) {
      queryBuilder.andWhere('transaction.date BETWEEN :dateFrom AND :dateTo', {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      });
    } else if (filters.dateFrom) {
      queryBuilder.andWhere('transaction.date >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    } else if (filters.dateTo) {
      queryBuilder.andWhere('transaction.date <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    if (filters.amountMin !== undefined) {
      queryBuilder.andWhere('transaction.amount >= :amountMin', {
        amountMin: filters.amountMin,
      });
    }

    if (filters.amountMax !== undefined) {
      queryBuilder.andWhere('transaction.amount <= :amountMax', {
        amountMax: filters.amountMax,
      });
    }

    if (filters.description) {
      queryBuilder.andWhere('transaction.description ILIKE :description', {
        description: `%${filters.description}%`,
      });
    }

    queryBuilder.orderBy('transaction.date', 'DESC');

    if (limit !== undefined) {
      queryBuilder.limit(limit);
    }

    if (offset !== undefined) {
      queryBuilder.offset(offset);
    }

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    const entities = await this.ormRepository.find({
      where: { categoryId },
      order: { date: 'DESC' },
    });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async findByDateRange(from: Date, to: Date): Promise<Transaction[]> {
    const entities = await this.ormRepository.find({
      where: {
        date: Between(from, to),
      },
      order: { date: 'DESC' },
    });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async getTotalAmountByType(type: TransactionType): Promise<number> {
    const result = await this.ormRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.type = :type', { type })
      .getRawOne<{ total: string }>();

    return parseFloat(result?.total ?? '0') || 0;
  }

  async countByCategory(categoryId: string): Promise<number> {
    return this.ormRepository.count({
      where: { categoryId },
    });
  }

  async findAllPaginated(
    limit: number,
    offset: number,
  ): Promise<Transaction[]> {
    const entities = await this.ormRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    return entities.map((entity) => this.toDomainEntity(entity));
  }

  async countByFilters(filters: TransactionFilters): Promise<number> {
    const queryBuilder = this.ormRepository.createQueryBuilder('transaction');

    if (filters.type) {
      queryBuilder.andWhere('transaction.type = :type', { type: filters.type });
    }

    if (filters.currency) {
      queryBuilder.andWhere('transaction.currency = :currency', {
        currency: filters.currency,
      });
    }

    if (filters.categoryId) {
      queryBuilder.andWhere('transaction.categoryId = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters.dateFrom && filters.dateTo) {
      queryBuilder.andWhere('transaction.date BETWEEN :dateFrom AND :dateTo', {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      });
    } else if (filters.dateFrom) {
      queryBuilder.andWhere('transaction.date >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    } else if (filters.dateTo) {
      queryBuilder.andWhere('transaction.date <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    if (filters.amountMin !== undefined) {
      queryBuilder.andWhere('transaction.amount >= :amountMin', {
        amountMin: filters.amountMin,
      });
    }

    if (filters.amountMax !== undefined) {
      queryBuilder.andWhere('transaction.amount <= :amountMax', {
        amountMax: filters.amountMax,
      });
    }

    if (filters.description) {
      queryBuilder.andWhere('transaction.description ILIKE :description', {
        description: `%${filters.description}%`,
      });
    }

    return queryBuilder.getCount();
  }

  private toTypeOrmEntity(transaction: Transaction): TransactionTypeOrmEntity {
    const entity = new TransactionTypeOrmEntity();
    // Only set id if it exists (for updates), let database generate it for new records
    if (transaction.id && transaction.id !== 0) {
      entity.id = transaction.id;
    }
    entity.uid = transaction.uid;
    entity.amount = transaction.amount;
    entity.type = transaction.type;
    entity.currency = transaction.currency;
    entity.categoryId = transaction.categoryId;
    entity.date = transaction.date;
    entity.description = transaction.description;
    if (transaction.createdAt) {
      entity.createdAt = transaction.createdAt;
    }
    if (transaction.updatedAt) {
      entity.updatedAt = transaction.updatedAt;
    }
    return entity;
  }

  private toDomainEntity(entity: TransactionTypeOrmEntity): Transaction {
    return Transaction.create({
      id: entity.id,
      uid: entity.uid,
      amount: entity.amount,
      type: entity.type,
      currency: entity.currency,
      categoryId: entity.categoryId,
      date: entity.date,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
