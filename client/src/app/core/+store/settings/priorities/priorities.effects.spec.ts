import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

import { PrioritiesEffects } from './priorities.effects';
import { PrioritiesService } from '../../../services';
import { TestData } from 'src/app/models';
import * as prioritiesActions from './priorities.actions';

const { priorities } = TestData.data;
const assert = (effect$: Observable<Action>, expected: TestColdObservable) => expect(effect$).toBeObservable(expected);
const error: Error = new Error('Error during request');

describe('PrioritiesEffects', () => {
  let actions$: Observable<Action>;
  let effects: PrioritiesEffects;
  let prioritiesServiceSpy: jasmine.SpyObj<PrioritiesService>;

  beforeEach(() => {
    prioritiesServiceSpy = jasmine.createSpyObj('PrioritiesService', ['getAll', 'create', 'update', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        PrioritiesEffects,
        provideMockActions(() => actions$),
        { provide: PrioritiesService, useValue: prioritiesServiceSpy },
      ],
    });

    effects = TestBed.inject(PrioritiesEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('get$', () => {
    it('should dispatch GetPrioritiesSuccess', () => {
      prioritiesServiceSpy.getAll.and.returnValue(of(priorities));

      actions$ = hot('-a', { a: new prioritiesActions.GetPriorities() });
      assert(effects.get$, cold('-b', { b: new prioritiesActions.GetPrioritiesSuccess(priorities) }));
    });

    it('should dispatch GetPrioritiesError', () => {
      prioritiesServiceSpy.getAll.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new prioritiesActions.GetPriorities() });
      assert(effects.get$, cold('-b', { b: new prioritiesActions.GetPrioritiesError(error) }));
    });
  });

  describe('create$', () => {
    it('should dispatch CreatePrioritySuccess', () => {
      prioritiesServiceSpy.create.and.returnValue(of(priorities[0]));

      actions$ = hot('-a', { a: new prioritiesActions.CreatePriority(priorities[0]) });
      assert(effects.create$, cold('-b', { b: new prioritiesActions.CreatePrioritySuccess(priorities[0]) }));
    });

    it('should dispatch CreatePriorityError', () => {
      prioritiesServiceSpy.create.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new prioritiesActions.CreatePriority(priorities[0]) });
      assert(effects.create$, cold('-b', { b: new prioritiesActions.CreatePriorityError(error) }));
    });
  });

  describe('update$', () => {
    it('should dispatch UpdatePrioritySuccess', () => {
      prioritiesServiceSpy.update.and.returnValue(of(priorities[0]));

      actions$ = hot('-a', { a: new prioritiesActions.UpdatePriority(priorities[0]) });
      assert(effects.update$, cold('-b', { b: new prioritiesActions.UpdatePrioritySuccess(priorities[0]) }));
    });

    it('should dispatch UpdatePriorityError', () => {
      prioritiesServiceSpy.update.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new prioritiesActions.UpdatePriority(priorities[0]) });
      assert(effects.update$, cold('-b', { b: new prioritiesActions.UpdatePriorityError(error) }));
    });
  });

  describe('remove$', () => {
    it('should dispatch RemovePrioritySuccess', () => {
      prioritiesServiceSpy.remove.and.returnValue(of(priorities[0]));

      actions$ = hot('-a', { a: new prioritiesActions.RemovePriority(priorities[0]) });
      assert(effects.remove$, cold('-b', { b: new prioritiesActions.RemovePrioritySuccess(priorities[0]) }));
    });

    it('should dispatch RemovePriorityError', () => {
      prioritiesServiceSpy.remove.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new prioritiesActions.RemovePriority(priorities[0]) });
      assert(effects.remove$, cold('-b', { b: new prioritiesActions.RemovePriorityError(error) }));
    });
  });
});
