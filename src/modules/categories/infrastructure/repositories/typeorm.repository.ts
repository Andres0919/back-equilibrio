import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, CategoryRepository, CategoryFilters } from '../../domain';
import { CategoryTypeOrmEntity } from '../entities/category.typeorm-entity';

@Injectable()
export class CategoryTypeOrmRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryTypeOrmEntity)
    private readonly repository: Repository<CategoryTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Category | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return null;
    }

    const entity = await this.repository.findOne({ where: { id: numericId } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Category[]> {
    const entities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async save(category: Category): Promise<Category> {
    const entity = this.toTypeOrm(category);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async delete(id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      await this.repository.delete(numericId);
    }
  }

  async findByName(name: string): Promise<Category | null> {
    const entity = await this.repository.findOne({ where: { name } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByFilters(filters: CategoryFilters): Promise<Category[]> {
    const queryBuilder = this.repository.createQueryBuilder('category');

    if (filters.name) {
      queryBuilder.andWhere('category.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.isActive !== undefined) {
      queryBuilder.andWhere('category.isActive = :isActive', {
        isActive: filters.isActive,
      });
    }

    if (filters.color) {
      queryBuilder.andWhere('category.color = :color', {
        color: filters.color,
      });
    }

    if (filters.icon) {
      queryBuilder.andWhere('category.icon = :icon', { icon: filters.icon });
    }

    queryBuilder.orderBy('category.createdAt', 'DESC');

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => this.toDomain(entity));
  }

  async findActiveCategories(): Promise<Category[]> {
    const entities = await this.repository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findInactiveCategories(): Promise<Category[]> {
    const entities = await this.repository.find({
      where: { isActive: false },
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repository.count({ where: { name } });
    return count > 0;
  }

  async existsByNameExcludingId(
    name: string,
    excludeId: number,
  ): Promise<boolean> {
    const queryBuilder = this.repository.createQueryBuilder('category');
    queryBuilder
      .where('category.name = :name', { name })
      .andWhere('category.id != :excludeId', { excludeId });

    const count = await queryBuilder.getCount();
    return count > 0;
  }

  private toDomain(entity: CategoryTypeOrmEntity): Category {
    return Category.create({
      id: entity.id,
      uid: entity.uid,
      name: entity.name,
      description: entity.description,
      color: entity.color,
      icon: entity.icon,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private toTypeOrm(category: Category): CategoryTypeOrmEntity {
    const entity = new CategoryTypeOrmEntity();

    if (category.id && category.id > 0) {
      entity.id = category.id;
    }

    entity.uid = category.uid;
    entity.name = category.name;
    entity.description = category.description;
    entity.color = category.color;
    entity.icon = category.icon;
    entity.isActive = category.isActive;

    if (category.createdAt) {
      entity.createdAt = category.createdAt;
    }

    if (category.updatedAt) {
      entity.updatedAt = category.updatedAt;
    }

    return entity;
  }
}
