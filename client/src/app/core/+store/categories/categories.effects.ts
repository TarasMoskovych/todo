import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoriesActionTypes } from './categories.actions';
import * as categoriesActions from './categories.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { Category } from 'src/app/models';
import { CategoriesService } from '../../services';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
  ) { }

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<categoriesActions.GetCategories>(CategoriesActionTypes.GET_CATEGORIES),
    pluck('payload'),
    switchMap(() => {
      return this.categoriesService
        .getAll()
        .pipe(
          map((categories: Category[]) => new categoriesActions.GetCategoriesSuccess(categories)),
          catchError((err: any) => of(new categoriesActions.GetCategoriesError(err)))
        )
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType<categoriesActions.CreateCategory>(CategoriesActionTypes.CREATE_CATEGORY),
    pluck('payload'),
    switchMap((category: Category) => {
      return this.categoriesService
        .create(category)
        .pipe(
          map((category: Category) => new categoriesActions.CreateCategorySuccess(category)),
          catchError((err: any) => of(new categoriesActions.CreateCategoryError(err)))
        )
    })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<categoriesActions.UpdateCategory>(CategoriesActionTypes.UPDATE_CATEGORY),
    pluck('payload'),
    switchMap((category: Category) => {
      return this.categoriesService
        .update(category)
        .pipe(
          map((category: Category) => new categoriesActions.UpdateCategorySuccess(category)),
          catchError((err: any) => of(new categoriesActions.UpdateCategoryError(err)))
        )
    })
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType<categoriesActions.RemoveCategory>(CategoriesActionTypes.REMOVE_CATEGORY),
    pluck('payload'),
    switchMap((category: Category) => {
      return this.categoriesService
        .remove(category)
        .pipe(
          map((category: Category) => new categoriesActions.RemoveCategorySuccess(category)),
          catchError((err: any) => of(new categoriesActions.RemoveCategoryError(err)))
        )
    })
  );
}
