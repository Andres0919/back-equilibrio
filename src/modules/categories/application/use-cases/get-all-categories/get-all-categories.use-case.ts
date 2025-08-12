import { UseCase } from '../../../../../shared/application';
import { Category, CategoryRepository, CategoryFilters } from '../../../domain';

export interface GetAllCategoriesRequest {
  filters?: CategoryFilters;
}

export interface CategoryResponse {
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

export interface GetAllCategoriesResponse {
  categories: CategoryResponse[];
  total: number;
}

export class GetAllCategoriesUseCase
  implements UseCase<GetAllCategoriesRequest, GetAllCategoriesResponse>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    request: GetAllCategoriesRequest,
  ): Promise<GetAllCategoriesResponse> {
    let categories: Category[];

    if (request.filters && Object.keys(request.filters).length > 0) {
      categories = await this.categoryRepository.findByFilters(request.filters);
    } else {
      categories = await this.categoryRepository.findAll();
    }

    const categoryResponses: CategoryResponse[] = categories.map(
      (category) => ({
        id: category.id,
        uid: category.uid,
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }),
    );

    return {
      categories: categoryResponses,
      total: categoryResponses.length,
    };
  }
}
