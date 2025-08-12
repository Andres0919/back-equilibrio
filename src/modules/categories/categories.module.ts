import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTypeOrmEntity } from './infrastructure';
import { CategoriesController } from './presentation';
import { CategoryProviders } from './categories.providers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryTypeOrmEntity])],
  controllers: [CategoriesController],
  providers: [...CategoryProviders],
  exports: [...CategoryProviders],
})
export class CategoriesModule {}
