import { UseCase } from '../../../../../shared/application';
import { ValidationError } from '../../../../../shared/domain';
import {
  Category,
  CategoryRepository,
  UidGeneratorInterface,
} from '../../../domain';

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive?: boolean;
}

export interface CreateCategoryResponse {
  id: number;
  uid: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateCategoryUseCase
  implements UseCase<CreateCategoryRequest, CreateCategoryResponse>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly uidGenerator: UidGeneratorInterface,
  ) {}

  async execute(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    // Check if category name already exists
    const existingCategory = await this.categoryRepository.findByName(
      request.name,
    );
    if (existingCategory) {
      throw new ValidationError(
        `Category with name "${request.name}" already exists`,
      );
    }

    // Generate UID
    const uid = this.uidGenerator.generate();

    // Create category domain entity
    const category = Category.create({
      uid,
      name: request.name,
      description: request.description,
      color: request.color,
      icon: request.icon,
      isActive: request.isActive ?? true,
    });

    // Save category
    const savedCategory = await this.categoryRepository.save(category);

    // Return response
    return {
      id: savedCategory.id,
      uid: savedCategory.uid,
      name: savedCategory.name,
      description: savedCategory.description,
      color: savedCategory.color,
      icon: savedCategory.icon,
      isActive: savedCategory.isActive,
      createdAt: savedCategory.createdAt,
      updatedAt: savedCategory.updatedAt,
    };
  }
}
