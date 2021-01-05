import { Category, CategoryEntity, TestData } from 'src/app/models';
import { categoriesReducer } from './categories.reducer';
import { initialCategoriesState } from './categories.state';
import {
  CreateCategorySuccess,
  FilterCategories,
  GetCategories,
  GetCategoriesError,
  GetCategoriesSuccess,
  RemoveCategorySuccess,
  SelectCategory,
  UpdateCategorySuccess
} from './categories.actions';

const { categories, filter, categoriesEntities: entities } = TestData.data;

describe('CategoriesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = categoriesReducer(undefined, {} as any);

      expect(state).toBe(initialCategoriesState);
    });
  });

  describe('GET_CATEGORIES action', () => {
    it('should set loading property to true', () => {
      const state = categoriesReducer(initialCategoriesState, new GetCategories());

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
      expect(state.entities).toEqual({});
    });
  });

  describe('GET_CATEGORIES_SUCCESS action', () => {
    it('should populate categories array', () => {
      const state = categoriesReducer(initialCategoriesState, new GetCategoriesSuccess(categories));

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('GET_CATEGORIES_ERROR action', () => {
    it('should populate error', () => {
      const error = new Error('Error during getting categories.')
      const state = categoriesReducer(initialCategoriesState, new GetCategoriesError(error));

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual({});
      expect(state.error).toEqual(error);
    });
  });

  describe('CREATE_CATEGORY_SUCCESS action', () => {
    it('should create new category', () => {
      const category: Category = {
        id: '10',
        name: 'car'
      };
      const entity: CategoryEntity = { 10: category };
      const state = categoriesReducer({ ...initialCategoriesState, entities }, new CreateCategorySuccess(category));

      expect(state.entities).toEqual({ ...entities, ...entity });
    });
  });

  describe('UPDATE_CATEGORY_SUCCESS action', () => {
    it('should update the category', () => {
      const category: Category = {
        id: '1',
        name: 'job'
      };
      const state = categoriesReducer({ ...initialCategoriesState, entities }, new UpdateCategorySuccess(category));

      expect(state.entities).toEqual({ ...entities, 1: category });
    });
  });

  describe('REMOVE_CATEGORY_SUCCESS action', () => {
    it('should remove the category', () => {
      const state = categoriesReducer({ ...initialCategoriesState, entities, selected: categories[0] }, new RemoveCategorySuccess(categories[0]));

      expect(state.entities).toEqual({
        2: categories[1],
        3: categories[2],
        4: categories[3],
        5: categories[4],
      });
      expect(state.selected).toBeNull();
    });
  });

  describe('SELECT_CATEGORY action', () => {
    it('should popilate selected category', () => {
      const state = categoriesReducer({ ...initialCategoriesState, entities }, new SelectCategory(categories[0]));

      expect(state.selected).toEqual(categories[0]);
    });
  });

  describe('FILTER_CATEGORIES action', () => {
    it('should popilate filter for categories', () => {
      const state = categoriesReducer(initialCategoriesState, new FilterCategories(filter));

      expect(state.filter).toEqual(filter);
    });
  });
});
