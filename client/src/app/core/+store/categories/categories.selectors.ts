import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category, Filter } from 'src/app/models';
import { CategoriesState } from './';
import { categoryAdapter } from './categories.state';

const getFilter   = (state: CategoriesState) => state.filter;
const getError    = (state: CategoriesState) => state.error;
const getLoaded   = (state: CategoriesState) => state.loaded;
const getLoading  = (state: CategoriesState) => state.loading;
const getSelected = (state: CategoriesState) => state.selected;

export const getCategoriesState = createFeatureSelector<CategoriesState>('categories');
export const { selectEntities: categoriesEntitiesSelector, selectAll: categoriesSelector } = categoryAdapter.getSelectors(getCategoriesState);
export const categoriesFilterSelector = createSelector(getCategoriesState, getFilter);
export const categoriesErrorSelector = createSelector(getCategoriesState, getError);
export const categoriesLoadedSelector = createSelector(getCategoriesState, getLoaded);
export const categoriesLoadingSelector = createSelector(getCategoriesState, getLoading);
export const categoriesSelectedSelector = createSelector(getCategoriesState, getSelected);
export const categoriesFilteredSelector = createSelector(
  categoriesSelector,
  categoriesFilterSelector,
  (categories: Category[], filter: Filter) => categories
    .filter((category: Category) => {
      // Filter by query
      if (filter.q && category.name.search(new RegExp(filter.q, 'i')) === -1) { return false; }
      return true;
    })
);
