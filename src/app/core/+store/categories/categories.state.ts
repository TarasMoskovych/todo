import { Category, Filter } from 'src/app/models';

export interface CategoryEntity {
  [id: number]: Category;
}

export interface CategoriesState {
  entities: CategoryEntity;
  filter: Filter;
  selected: Category;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCategoriesState: CategoriesState = {
  entities: {},
  filter: {},
  selected: null,
  loading: false,
  loaded: false,
  error: null,
};
