import { Provider } from '@nestjs/common';
import { CategoryRepository, UidGeneratorInterface } from './domain';
import { CreateCategoryUseCase, GetAllCategoriesUseCase } from './application';
import {
  CategoryTypeOrmRepository,
  UuidGeneratorService,
} from './infrastructure';

export const CategoryProviders: Provider[] = [
  // Repository implementations
  {
    provide: 'CategoryRepository',
    useClass: CategoryTypeOrmRepository,
  },

  // Service implementations
  {
    provide: 'UidGeneratorInterface',
    useClass: UuidGeneratorService,
  },

  // Use cases
  {
    provide: CreateCategoryUseCase,
    useFactory: (
      categoryRepository: CategoryRepository,
      uidGenerator: UidGeneratorInterface,
    ) => new CreateCategoryUseCase(categoryRepository, uidGenerator),
    inject: ['CategoryRepository', 'UidGeneratorInterface'],
  },
  {
    provide: GetAllCategoriesUseCase,
    useFactory: (categoryRepository: CategoryRepository) =>
      new GetAllCategoriesUseCase(categoryRepository),
    inject: ['CategoryRepository'],
  },
];
