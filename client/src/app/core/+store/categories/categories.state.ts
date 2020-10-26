import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category, Filter } from 'src/app/models';

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export interface CategoriesState extends EntityState<Category> {
  readonly filter: Filter;
  readonly selected: Category;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCategoriesState: CategoriesState = categoryAdapter.getInitialState({
  filter: {},
  selected: null,
  loading: false,
  loaded: false,
  error: null,
});
