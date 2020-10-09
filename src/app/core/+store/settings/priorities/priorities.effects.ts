import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PrioritiesActionTypes } from './priorities.actions';
import * as prioritiesActions from './priorities.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { Priority } from 'src/app/models';
import { PrioritiesService } from '../../../services';

@Injectable()
export class PrioritiesEffects {
  constructor(
    private actions$: Actions,
    private prioritiesService: PrioritiesService,
  ) { }

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<prioritiesActions.GetPriorities>(PrioritiesActionTypes.GET_PRIORITIES),
    pluck('payload'),
    switchMap(() => {
      return this.prioritiesService
        .getAll()
        .pipe(
          map((priorities: Priority[]) => new prioritiesActions.GetPrioritiesSuccess(priorities)),
          catchError((err: any) => of(new prioritiesActions.GetPrioritiesError(err)))
        )
    })
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType<prioritiesActions.RemovePriority>(PrioritiesActionTypes.REMOVE_PRIORITY),
    pluck('payload'),
    switchMap((priority: Priority) => {
      return this.prioritiesService
        .remove(priority)
        .pipe(
          map((priority: Priority) => new prioritiesActions.RemovePrioritySuccess(priority)),
          catchError((err: any) => of(new prioritiesActions.RemovePriorityError(err)))
        )
    })
  );
}
