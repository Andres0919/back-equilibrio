import { Repository } from '../../../../shared/domain';
import { Category } from '../entities/category.entity';

export interface CategoryFilters {
  name?: string;
  isActive?: boolean;
  color?: string;
  icon?: string;
}

export interface CategoryRepository extends Repository<Category> {
  findByName(name: string): Promise<Category | null>;
  findByFilters(filters: CategoryFilters): Promise<Category[]>;
  findActiveCategories(): Promise<Category[]>;
  findInactiveCategories(): Promise<Category[]>;
  existsByName(name: string): Promise<boolean>;
  existsByNameExcludingId(name: string, excludeId: number): Promise<boolean>;
}
