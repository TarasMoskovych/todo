import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Category, CategoryEntity, Filter, TestData } from 'src/app/models';
import { AppState, registerStore } from '../app.state';
import {
  FilterCategories,
  GetCategories,
  GetCategoriesError,
  GetCategoriesSuccess,
  SelectCategory
} from './categories.actions';

import {
  categoriesEntitiesSelector,
  categoriesErrorSelector,
  categoriesFilteredSelector,
  categoriesFilterSelector,
  categoriesLoadedSelector,
  categoriesLoadingSelector,
  categoriesSelectedSelector,
  categoriesSelector
} from './categories.selectors';

const { categories, filter, categoriesEntities: entities } = TestData.data;

describe('Categories Selectors', () => {
  let store$: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...registerStore(),
      ]
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  describe('categoriesEntitiesSelector', () => {
    it('should return categories as entities', () => {
      let result: CategoryEntity;

      store$
        .select(categoriesEntitiesSelector)
        .subscribe((entity: CategoryEntity) => result = entity);

      expect(result).toEqual({});

      store$.dispatch(new GetCategoriesSuccess(categories));
      expect(result).toEqual(entities);
    });
  });

  describe('categoriesSelector', () => {
    it('should return categories as array', () => {
      let result: Category[];

      store$
        .select(categoriesSelector)
        .subscribe((categories: Category[]) => result = categories);

      expect(result).toEqual([]);

      store$.dispatch(new GetCategoriesSuccess(categories));
      expect(result).toEqual(categories);
    });
  });

  describe('categoriesFilterSelector', () => {
    it('should return categories filter', () => {
      let result: Filter;

      store$
        .select(categoriesFilterSelector)
        .subscribe((filter: Filter) => result = filter);

      expect(result).toEqual({ q: null });

      store$.dispatch(new FilterCategories(filter));
      expect(result).toEqual(filter);
    });
  });

  describe('categoriesErrorSelector', () => {
    it('should return categories error', () => {
      const error = 'Error during getting categories';
      let result: Error | string;

      store$
        .select(categoriesErrorSelector)
        .subscribe((error: Error | string) => result = error);

      expect(result).toBeNull();

      store$.dispatch(new GetCategoriesError(error));
      expect(result).toEqual(error);
    });
  });

  describe('categoriesLoadedLoadingSelector', () => {
    it('should return categories loaded', () => {
      let result: boolean = false;

      store$
        .select(categoriesLoadedSelector)
        .subscribe((loaded: boolean) => result = loaded);

      expect(result).toBeFalse();

      store$.dispatch(new GetCategoriesSuccess(categories));
      expect(result).toBeTrue();
    });

    it('should return categories loading', () => {
      let result: boolean = false;

      store$
        .select(categoriesLoadingSelector)
        .subscribe((loading: boolean) => result = loading);

      expect(result).toBeFalse();

      store$.dispatch(new GetCategories());
      expect(result).toBeTrue();
    });
  });

  describe('categoriesSelectedSelector', () => {
    it('should return selected category', () => {
      let result: Category;

      store$
        .select(categoriesSelectedSelector)
        .subscribe((category: Category) => result = category);

      expect(result).toBeNull();

      store$.dispatch(new SelectCategory(categories[1]));
      expect(result).toEqual(categories[1]);

      store$.dispatch(new SelectCategory(null));
      expect(result).toBeNull();
    });
  });

  describe('categoriesFilteredSelector', () => {
    it('should return filtered categories', () => {
      let result: Category[];

      store$
        .select(categoriesFilteredSelector)
        .subscribe((categories: Category[]) => result = categories);

      expect(result).toEqual([]);

      store$.dispatch(new FilterCategories(filter));
      store$.dispatch(new GetCategoriesSuccess(categories));

      expect(result).toEqual([categories[2]]);

      store$.dispatch(new FilterCategories({ q: null }));
      expect(result).toEqual(categories);

      store$.dispatch(new FilterCategories({ q: 'devices' }));
      expect(result).toEqual([]);

      store$.dispatch(new FilterCategories({ q: 'i' }));
      expect(result).toEqual([categories[1], categories[2], categories[3]]);
    });
  });
});
