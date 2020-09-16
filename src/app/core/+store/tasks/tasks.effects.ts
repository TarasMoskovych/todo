import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TasksActionTypes } from './tasks.actions';
import * as tasksActions from './tasks.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { Task } from '../../../models';
import { TasksService } from '../../services';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) { }

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<tasksActions.GetTasks>(TasksActionTypes.GET_TASKS),
    pluck('payload'),
    switchMap(() => {
      return this.tasksService
        .getAll()
        .pipe(
          map((tasks: Task[]) => new tasksActions.GetTasksSuccess(tasks)),
          catchError((err: any) => of(new tasksActions.GetTasksError(err)))
        )
    })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<tasksActions.UpdateTask>(TasksActionTypes.UPDATE_TASK),
    pluck('payload'),
    switchMap((task: Task) => {
      return this.tasksService
        .update(task)
        .pipe(
          map((task: Task) => new tasksActions.UpdateTaskSuccess(task)),
          catchError((err: any) => of(new tasksActions.UpdateTaskError(err)))
        )
    })
  );
}
