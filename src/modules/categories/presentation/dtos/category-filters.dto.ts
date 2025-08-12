import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, Matches } from 'class-validator';

export class CategoryFiltersDto {
  @ApiPropertyOptional({
    description: 'Filter by category name (partial match)',
    example: 'food',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by hex color code',
    example: '#FF6B6B',
  })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'Color must be a valid hex color format (#RRGGBB)',
  })
  color?: string;

  @ApiPropertyOptional({
    description: 'Filter by icon identifier',
    example: 'restaurant',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
