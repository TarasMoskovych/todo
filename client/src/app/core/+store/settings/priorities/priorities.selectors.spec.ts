import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Priority } from 'src/app/models';

import { AppState, registerStore } from '../../app.state';
import { PriorityEntity } from './priorities.state';
import { GetPriorities, GetPrioritiesError, GetPrioritiesSuccess } from './priorities.actions';
import {
  prioritiesEntitiesSelector,
  prioritiesSelector,
  prioritiesErrorSelector,
  prioritiesLoadedSelector,
  prioritiesLoadingSelector
} from './priorities.selectors';

describe('Categories Selectors', () => {
  let store$: Store<AppState>;
  const priorities: Priority[] = [
    {
      id: '1',
      name: 'low',
      color: '#e5e5e5'
    },
    {
      id: '2',
      name: 'medium',
      color: '#85D1B2'
    },
    {
      id: '3',
      name: 'high',
      color: '#F1828D'
    },
    {
      id: '4',
      name: 'highest',
      color: '#F1128D'
    },
  ];
  const entities: PriorityEntity = priorities.reduce((acc: PriorityEntity, priority: Priority) => {
    return { ...acc, [priority.id]: priority };
  }, {});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...registerStore(),
      ]
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  describe('prioritiesEntitiesSelector', () => {
    it('should return priorities as entities', () => {
      let result: PriorityEntity;

      store$
        .select(prioritiesEntitiesSelector)
        .subscribe((entity: PriorityEntity) => result = entity);

      expect(result).toEqual({});

      store$.dispatch(new GetPrioritiesSuccess(priorities));
      expect(result).toEqual(entities);
    });
  });

  describe('prioritiesSelector', () => {
    it('should return priorities as array', () => {
      let result: Priority[];

      store$
        .select(prioritiesSelector)
        .subscribe((priorities: Priority[]) => result = priorities);

      expect(result).toEqual([]);

      store$.dispatch(new GetPrioritiesSuccess(priorities));
      expect(result).toEqual(priorities);
    });
  });

  describe('prioritiesErrorSelector', () => {
    it('should return priorities error', () => {
      const error = 'Error during getting priorities';
      let result: Error | string;

      store$
        .select(prioritiesErrorSelector)
        .subscribe((error: Error | string) => result = error);

      expect(result).toBeNull();

      store$.dispatch(new GetPrioritiesError(error));
      expect(result).toEqual(error);
    });
  });

  describe('prioritiesLoadedLoadingSelector', () => {
    it('should return priorities loaded', () => {
      let result: boolean = false;

      store$
        .select(prioritiesLoadedSelector)
        .subscribe((loaded: boolean) => result = loaded);

      expect(result).toBeFalse();

      store$.dispatch(new GetPrioritiesSuccess(priorities));
      expect(result).toBeTrue();
    });

    it('should return priorities loading', () => {
      let result: boolean = false;

      store$
        .select(prioritiesLoadingSelector)
        .subscribe((loading: boolean) => result = loading);

      expect(result).toBeFalse();

      store$.dispatch(new GetPriorities());
      expect(result).toBeTrue();
    });
  });
});
