import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryUseCase, GetAllCategoriesUseCase } from '../application';
import {
  CreateCategoryDto,
  CategoryResponseDto,
  CategoryFiltersDto,
} from './dtos';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const result = await this.createCategoryUseCase.execute(createCategoryDto);
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories with optional filters' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          items: { $ref: '#/components/schemas/CategoryResponseDto' },
        },
        total: {
          type: 'number',
          example: 10,
        },
      },
    },
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by category name (partial match)',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filter by active status',
    type: Boolean,
  })
  @ApiQuery({
    name: 'color',
    required: false,
    description: 'Filter by hex color code',
  })
  @ApiQuery({
    name: 'icon',
    required: false,
    description: 'Filter by icon identifier',
  })
  async getAllCategories(
    @Query() filters: CategoryFiltersDto,
  ): Promise<{ categories: CategoryResponseDto[]; total: number }> {
    const result = await this.getAllCategoriesUseCase.execute({ filters });
    return result;
  }
}
