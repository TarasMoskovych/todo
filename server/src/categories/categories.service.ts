import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractLowDbService } from '../database';
import { Category, CategoryFilter } from './category.model';

@Injectable()
export class CategoriesService extends AbstractLowDbService<Category> {

  constructor() {
    super('categories', 'Category');
  }

  get(filter?: CategoryFilter): Category[] {
    return this.getAll()
      .filter((category: Category) => {
        if (filter.q && category.name.search(new RegExp(filter.q, 'i')) === -1) { return false; }
        return true;
      });
  }

  create(category: Category): Category {
    const name = category.name.toLowerCase();

    if (this.findByProp('name', name)) {
      throw new BadRequestException(`Category name should be unique`);
    }

    return super.create({ ...category, name });
  }
}
