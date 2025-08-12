import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Unique string identifier of the category',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  uid: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Food & Dining',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'Expenses related to food, restaurants, and dining',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Hex color code for the category',
    example: '#FF6B6B',
  })
  color?: string;

  @ApiPropertyOptional({
    description: 'Icon identifier for the category',
    example: 'restaurant',
  })
  icon?: string;

  @ApiProperty({
    description: 'Whether the category is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-08-11T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-08-11T10:00:00.000Z',
  })
  updatedAt: Date;
}
