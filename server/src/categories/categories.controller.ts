import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category, CategoryFilter } from './category.model';

@Controller('api/categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) { }

  @Get()
  get(@Query() filter: CategoryFilter): Category[] {
    return this.categoriesService.get(filter);
  }

  @Get(':id')
  getById(@Param('id') id: string): Category {
    return this.categoriesService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() payload: Category): Category {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() payload: Category): Category {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Category {
    return this.categoriesService.delete(id);
  }
}
