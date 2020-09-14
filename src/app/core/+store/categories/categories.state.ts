import { Category } from 'src/app/models';

export interface CategoryEntity {
  [id: number]: Category;
}

export interface CategoriesState {
  entities: CategoryEntity;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCategoriesState: CategoriesState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};
