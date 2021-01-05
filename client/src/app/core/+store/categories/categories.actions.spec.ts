import { Category, TestData } from 'src/app/models';
import {
  CategoriesActions,
  CategoriesActionTypes,
  CreateCategory,
  CreateCategoryError,
  CreateCategorySuccess,
  FilterCategories,
  GetCategories,
  GetCategoriesError,
  GetCategoriesSuccess,
  RemoveCategory,
  RemoveCategoryError,
  RemoveCategorySuccess,
  SelectCategory,
  UpdateCategory,
  UpdateCategoryError,
  UpdateCategorySuccess
} from './categories.actions';

const { filter, categories } = TestData.data;
const error = 'Some error message';
const category: Category = categories[0];

describe('CategoriesActions', () => {

  it('should create GetCategories', () => {
    const action: CategoriesActions = new GetCategories();
    expect(action).toBeTruthy();
    expect(action.type).toBe(CategoriesActionTypes.GET_CATEGORIES);
  });

  it('should create GetCategoriesSuccess', () => {
    const action: CategoriesActions = new GetCategoriesSuccess([]);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual([]);
    expect(action.type).toBe(CategoriesActionTypes.GET_CATEGORIES_SUCCESS);
  });

  it('should create GetCategoriesError', () => {
    const action: CategoriesActions = new GetCategoriesError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(CategoriesActionTypes.GET_CATEGORIES_ERROR);
  });

  it('should create CreateCategory', () => {
    const action: CategoriesActions = new CreateCategory(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.CREATE_CATEGORY);
  });

  it('should create CreateCategory', () => {
    const action: CategoriesActions = new CreateCategorySuccess(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.CREATE_CATEGORY_SUCCESS);
  });

  it('should create CreateCategoryError', () => {
    const action: CategoriesActions = new CreateCategoryError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(CategoriesActionTypes.CREATE_CATEGORY_ERROR);
  });

  it('should create UpdateCategory', () => {
    const action: CategoriesActions = new UpdateCategory(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.UPDATE_CATEGORY);
  });

  it('should create UpdateCategorySuccess', () => {
    const action: CategoriesActions = new UpdateCategorySuccess(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS);
  });

  it('should create UpdateCategoryError', () => {
    const action: CategoriesActions = new UpdateCategoryError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(CategoriesActionTypes.UPDATE_CATEGORY_ERROR);
  });

  it('should create RemoveCategory', () => {
    const action: CategoriesActions = new RemoveCategory(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.REMOVE_CATEGORY);
  });

  it('should create RemoveCategorySuccess', () => {
    const action: CategoriesActions = new RemoveCategorySuccess(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.REMOVE_CATEGORY_SUCCESS);
  });

  it('should create RemoveCategoryError', () => {
    const action: CategoriesActions = new RemoveCategoryError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(CategoriesActionTypes.REMOVE_CATEGORY_ERROR);
  });

  it('should create SelectCategory', () => {
    const action: CategoriesActions = new SelectCategory(category);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(category);
    expect(action.type).toBe(CategoriesActionTypes.SELECT_CATEGORY);
  });

  it('should create FilterCategories', () => {
    const action: CategoriesActions = new FilterCategories(filter);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(filter);
    expect(action.type).toBe(CategoriesActionTypes.FILTER_CATEGORIES);
  });
});
