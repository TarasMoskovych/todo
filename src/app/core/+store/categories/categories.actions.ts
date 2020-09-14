import { Action } from '@ngrx/store';

import { Category } from 'src/app/models';

export enum CategoriesActionTypes {
  GET_CATEGORIES          = '[Categories] GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS  = '[Categories] GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_ERROR    = '[Categories] GET_CATEGORIES_ERROR',

  CREATE_CATEGORY         = '[Categories] CREATE_CATEGORY',
  CREATE_CATEGORY_SUCCESS = '[Categories] CREATE_CATEGORY_SUCCESS',
  CREATE_CATEGORY_ERROR   = '[Categories] CREATE_CATEGORY_ERROR',

  UPDATE_CATEGORY         = '[Categories] UPDATE_CATEGORY',
  UPDATE_CATEGORY_SUCCESS = '[Categories] UPDATE_CATEGORY_SUCCESS',
  UPDATE_CATEGORY_ERROR   = '[Categories] UPDATE_CATEGORY_ERROR',

  REMOVE_CATEGORY         = '[Categories] REMOVE_CATEGORY',
  REMOVE_CATEGORY_SUCCESS = '[Categories] REMOVE_CATEGORY_SUCCESS',
  REMOVE_CATEGORY_ERROR   = '[Categories] REMOVE_CATEGORY_ERROR',

  SELECT_CATEGORY         = '[Categories] SELECT_CATEGORY',
}

export class GetCategories implements Action {
  readonly type = CategoriesActionTypes.GET_CATEGORIES;
}

export class GetCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.GET_CATEGORIES_SUCCESS;
  constructor(public payload: Category[]) { }
}

export class GetCategoriesError implements Action {
  readonly type = CategoriesActionTypes.GET_CATEGORIES_ERROR;
  constructor(public payload: Error | string) { }
}

export class CreateCategory implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY;
  constructor(public payload: Category) { }
}

export class CreateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) { }
}

export class CreateCategoryError implements Action {
  readonly type = CategoriesActionTypes.CREATE_CATEGORY_ERROR;
  constructor(public payload: Error | string) { }
}

export class UpdateCategory implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY;
  constructor(public payload: Category) { }
}

export class UpdateCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) { }
}

export class UpdateCategoryError implements Action {
  readonly type = CategoriesActionTypes.UPDATE_CATEGORY_ERROR;
  constructor(public payload: Error | string) { }
}

export class RemoveCategory implements Action {
  readonly type = CategoriesActionTypes.REMOVE_CATEGORY;
  constructor(public payload: Category) { }
}

export class RemoveCategorySuccess implements Action {
  readonly type = CategoriesActionTypes.REMOVE_CATEGORY_SUCCESS;
  constructor(public payload: Category) { }
}

export class RemoveCategoryError implements Action {
  readonly type = CategoriesActionTypes.REMOVE_CATEGORY_ERROR;
  constructor(public payload: Error | string) { }
}

export class SelectCategory implements Action {
  readonly type = CategoriesActionTypes.SELECT_CATEGORY;
  constructor(public payload: Category) { }
}

export type CategoriesActions
  = GetCategories
  | GetCategoriesSuccess
  | GetCategoriesError
  | CreateCategory
  | CreateCategorySuccess
  | CreateCategoryError
  | UpdateCategory
  | UpdateCategorySuccess
  | UpdateCategoryError
  | RemoveCategory
  | RemoveCategorySuccess
  | RemoveCategoryError
  | SelectCategory;
