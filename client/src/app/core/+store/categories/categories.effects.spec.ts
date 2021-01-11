import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

import { CategoriesEffects } from './categories.effects';
import { CategoriesService } from '../../services';
import { TestData } from 'src/app/models';
import * as categoriesActions from './categories.actions';

const { categories } = TestData.data;
const assert = (effect$: Observable<Action>, expected: TestColdObservable) => expect(effect$).toBeObservable(expected);
const error: Error = new Error('Error during request');

describe('CategoriesEffects', () => {
  let actions$: Observable<Action>;
  let effects: CategoriesEffects;
  let categoriesServiceSpy: jasmine.SpyObj<CategoriesService>;

  beforeEach(() => {
    categoriesServiceSpy = jasmine.createSpyObj('CategoriesService', ['getAll', 'create', 'update', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        CategoriesEffects,
        provideMockActions(() => actions$),
        { provide: CategoriesService, useValue: categoriesServiceSpy },
      ],
    });

    effects = TestBed.inject(CategoriesEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('get$', () => {
    it('should dispatch GetCategoriesSuccess', () => {
      categoriesServiceSpy.getAll.and.returnValue(of(categories));

      actions$ = hot('-a', { a: new categoriesActions.GetCategories() });
      assert(effects.get$, cold('-b', { b: new categoriesActions.GetCategoriesSuccess(categories) }));
    });

    it('should dispatch GetCategoriesError', () => {
      categoriesServiceSpy.getAll.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new categoriesActions.GetCategories() });
      assert(effects.get$, cold('-b', { b: new categoriesActions.GetCategoriesError(error) }));
    });
  });

  describe('create$', () => {
    it('should dispatch CreateCategorySuccess', () => {
      categoriesServiceSpy.create.and.returnValue(of(categories[0]));

      actions$ = hot('-a', { a: new categoriesActions.CreateCategory(categories[0]) });
      assert(effects.create$, cold('-b', { b: new categoriesActions.CreateCategorySuccess(categories[0]) }));
    });

    it('should dispatch CreateCategoryError', () => {
      categoriesServiceSpy.create.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new categoriesActions.CreateCategory(categories[0]) });
      assert(effects.create$, cold('-b', { b: new categoriesActions.CreateCategoryError(error) }));
    });
  });

  describe('update$', () => {
    it('should dispatch UpdateCategorySuccess', () => {
      categoriesServiceSpy.update.and.returnValue(of(categories[0]));

      actions$ = hot('-a', { a: new categoriesActions.UpdateCategory(categories[0]) });
      assert(effects.update$, cold('-b', { b: new categoriesActions.UpdateCategorySuccess(categories[0]) }));
    });

    it('should dispatch UpdateCategoryError', () => {
      categoriesServiceSpy.update.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new categoriesActions.UpdateCategory(categories[0]) });
      assert(effects.update$, cold('-b', { b: new categoriesActions.UpdateCategoryError(error) }));
    });
  });

  describe('remove$', () => {
    it('should dispatch RemoveCategorySuccess', () => {
      categoriesServiceSpy.remove.and.returnValue(of(categories[0]));

      actions$ = hot('-a', { a: new categoriesActions.RemoveCategory(categories[0]) });
      assert(effects.remove$, cold('-b', { b: new categoriesActions.RemoveCategorySuccess(categories[0]) }));
    });

    it('should dispatch RemoveCategoryError', () => {
      categoriesServiceSpy.remove.and.returnValue(throwError(error));

      actions$ = hot('-a', { a: new categoriesActions.RemoveCategory(categories[0]) });
      assert(effects.remove$, cold('-b', { b: new categoriesActions.RemoveCategoryError(error) }));
    });
  });
});
