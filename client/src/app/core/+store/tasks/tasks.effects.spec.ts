import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

import { TasksEffects } from './tasks.effects';
import { TasksService } from '../../services';
import { TestData } from 'src/app/models';
import * as tasksActions from './tasks.actions';

const { tasks } = TestData.data;
const assert = (effect$: Observable<Action>, expected: TestColdObservable) => expect(effect$).toBeObservable(expected);
const error: Error = new Error('Error during request');

describe('TasksEffects', () => {
  let actions$: Observable<Action>;
  let effects: TasksEffects;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;

  beforeEach(() => {
    tasksServiceSpy = jasmine.createSpyObj('TasksService', ['getAll', 'create', 'update', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        TasksEffects,
        provideMockActions(() => actions$),
        { provide: TasksService, useValue: tasksServiceSpy },
      ],
    });

    effects = TestBed.inject(TasksEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('get$', () => {
    it('should dispatch GetTasksSuccess', () => {
      tasksServiceSpy.getAll.and.returnValue(of(tasks));

      actions$ = hot('-a', { a: new tasksActions.GetTasks() });
      assert(effects.get$, cold('-b', { b: new tasksActions.GetTasksSuccess(tasks) }));
    });

    it('should dispatch GetTasksError', () => {
      tasksServiceSpy.getAll.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new tasksActions.GetTasks() });
      assert(effects.get$, cold('-b', { b: new tasksActions.GetTasksError(error) }));
    });
  });

  describe('create$', () => {
    it('should dispatch CreateTaskSuccess', () => {
      tasksServiceSpy.create.and.returnValue(of(tasks[0]));

      actions$ = hot('-a', { a: new tasksActions.CreateTask(tasks[0]) });
      assert(effects.create$, cold('-b', { b: new tasksActions.CreateTaskSuccess(tasks[0]) }));
    });

    it('should dispatch CreateTaskError', () => {
      tasksServiceSpy.create.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new tasksActions.CreateTask(tasks[0]) });
      assert(effects.create$, cold('-b', { b: new tasksActions.CreateTaskError(error) }));
    });
  });

  describe('update$', () => {
    it('should dispatch UpdateTaskSuccess', () => {
      tasksServiceSpy.update.and.returnValue(of(tasks[0]));

      actions$ = hot('-a', { a: new tasksActions.UpdateTask(tasks[0]) });
      assert(effects.update$, cold('-b', { b: new tasksActions.UpdateTaskSuccess(tasks[0]) }));
    });

    it('should dispatch UpdateTaskError', () => {
      tasksServiceSpy.update.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new tasksActions.UpdateTask(tasks[0]) });
      assert(effects.update$, cold('-b', { b: new tasksActions.UpdateTaskError(error) }));
    });
  });

  describe('remove$', () => {
    it('should dispatch RemoveTaskSuccess', () => {
      tasksServiceSpy.remove.and.returnValue(of(tasks[0]));

      actions$ = hot('-a', { a: new tasksActions.RemoveTask(tasks[0]) });
      assert(effects.remove$, cold('-b', { b: new tasksActions.RemoveTaskSuccess(tasks[0]) }));
    });

    it('should dispatch RemoveTaskError', () => {
      tasksServiceSpy.remove.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new tasksActions.RemoveTask(tasks[0]) });
      assert(effects.remove$, cold('-b', { b: new tasksActions.RemoveTaskError(error) }));
    });
  });
});
