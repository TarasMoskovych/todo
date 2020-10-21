import { Injectable } from '@nestjs/common';
import { AbstractLowDbService } from 'src/database';
import { Category, CategoryFilter } from './category.model';

@Injectable()
export class CategoriesService extends AbstractLowDbService<Category> {

  constructor() {
    super('categories', 'Category');
  }

  get(filter?: CategoryFilter): Category[] {
    return this.getAll()
      .filter((category: Category) => {
        if (filter.query && category.name.search(new RegExp(filter.query, 'i')) === -1) { return false; }
        return true;
      });
  }
}
