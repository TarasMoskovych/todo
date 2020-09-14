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
}
