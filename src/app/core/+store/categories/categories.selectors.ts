import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState, CategoryEntity } from './';

const getEntities = (state: CategoriesState) => state.entities;
const getError    = (state: CategoriesState) => state.error;
const getLoaded   = (state: CategoriesState) => state.loaded;
const getLoading  = (state: CategoriesState) => state.loading;

export const getCategoriesState = createFeatureSelector<CategoriesState>('categories');
export const categoriesEntitiesSelector = createSelector(getCategoriesState, getEntities);
export const categoriesErrorSelector = createSelector(getCategoriesState, getError);
export const categoriesLoadedSelector = createSelector(getCategoriesState, getLoaded);
export const categoriesLoadingSelector = createSelector(getCategoriesState, getLoading);
export const categoriesSelector = createSelector(
  categoriesEntitiesSelector,
  (entities: CategoryEntity) => Object.keys(entities).map((id: string) => entities[id])
);
