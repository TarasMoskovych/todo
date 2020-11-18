import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Category, Priority, Task, TaskEntity, TaskFilter, TasksStatistics, TasksUncompletedCount } from 'src/app/models';

import { AppState, registerStore } from '../app.state';
import { GetCategoriesSuccess, SelectCategory } from '../categories';
import { GetPrioritiesSuccess } from '../settings';
import { FilterTasks, GetTasksSuccess, ToggleStatistic, GetTasksError, GetTasks, UpdateTaskSuccess } from './tasks.actions';
import {
  tasksEntitiesSelector,
  tasksErrorSelector,
  tasksFilterSelector,
  tasksLoadedSelector,
  tasksLoadingSelector,
  tasksPrioritiesSelector,
  tasksSelector,
  tasksShowStatisticSelector,
  tasksTotal,
  tasksUncompletedSelector,
  tasksCategorySelector,
  tasksCategoryCompletedSelector,
  tasksFilteredSelector,
  tasksStatisticsSelector,
  tasksUncompletedCountSelector,
  tasksPrioritiesCountSelector,
} from './tasks.selectors';

describe('Tasks Selectors', () => {
  let store$: Store<AppState>;
  const tasks: Task[] = [
    {
      id: '1',
      name: 'Fill the gasoline tank full',
      priority: '3',
      completed: false,
      category: '10',
      date: new Date('2020-04-10'),
    },
    {
      id: '2',
      name: 'Submit reports to the head of department',
      priority: '1',
      completed: false,
      category: '1',
      date: new Date('2020-04-11'),
    },
    {
      id: '3',
      name: 'Clean up the room, water the plants',
      priority: '3',
      completed: true,
      category: '2'
    },
    {
      id: '4',
      name: 'Go to the park with the family, invite friends',
      priority: '2',
      completed: false,
      category: '2',
      date: new Date('2020-08-17'),
    },
    {
      id: '5',
      name: 'Find and learn a quantum physics textbook',
      completed: true,
    },
  ];
  const entities: TaskEntity = tasks.reduce((acc: TaskEntity, task: Task) => {
    return { ...acc, [task.id]: task };
  }, {});
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
  const categories: Category[] = [
    {
      id: '1',
      name: 'work',
    },
    {
      id: '2',
      name: 'family',
    },
    {
      id: '3',
      name: 'education',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...registerStore(),
      ]
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  describe('tasksEntitiesSelector', () => {
    it('should return tasks as entities', () => {
      let result: TaskEntity;

      store$
        .select(tasksEntitiesSelector)
        .subscribe((entity: TaskEntity) => result = entity);

      expect(result).toEqual({});

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toEqual(entities);
    });
  });

  describe('tasksSelector', () => {
    it('should return tasks as array', () => {
      let result: Task[];

      store$
        .select(tasksSelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toEqual(tasks);
    });
  });

  describe('tasksTotal', () => {
    it('should return total tasks length', () => {
      let result: number;

      store$
        .select(tasksTotal)
        .subscribe((total: number) => result = total);

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toEqual(tasks.length);
    });
  });

  describe('tasksFilterSelector', () => {
    it('should return tasks filter', () => {
      const taskFilter: TaskFilter = {
        completed: false,
        priority: null,
        q: 'task',
      };
      let result: TaskFilter;

      store$
        .select(tasksFilterSelector)
        .subscribe((filter: TaskFilter) => result = filter);

      store$.dispatch(new FilterTasks(taskFilter));
      expect(result).toEqual(taskFilter);
    });
  });

  describe('tasksShowStatisticSelector', () => {
    it('should return tasks statistic flag', () => {
      let result = false;

      store$
        .select(tasksShowStatisticSelector)
        .subscribe((show: boolean) => result = show);

      store$.dispatch(new ToggleStatistic(true));
      expect(result).toBeTrue();
    });
  });

  describe('tasksErrorSelector', () => {
    it('should return tasks error', () => {
      const error: Error = new Error('Error during getting tasks');
      let result: Error;

      store$
        .select(tasksErrorSelector)
        .subscribe((err: Error) => result = err);

      store$.dispatch(new GetTasksError(error));
      expect(result).toEqual(error);
    });
  });

  describe('tasksLoadedSelector', () => {
    it('should return tasks loaded', () => {
      let result = false;

      store$
        .select(tasksLoadedSelector)
        .subscribe((loaded: boolean) => result = loaded);

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toBeTrue();

      store$.dispatch(new GetTasksError(''));
      expect(result).toBeFalse();
    });
  });

  describe('tasksLoadingSelector', () => {
    it('should return tasks loading', () => {
      let result = false;

      store$
        .select(tasksLoadingSelector)
        .subscribe((loaded: boolean) => result = loaded);

      store$.dispatch(new GetTasks());
      expect(result).toBeTrue();
    });
  });

  describe('tasksUncompletedSelector', () => {
    it('should return uncompleted tasks', () => {
      let result: Task[];

      store$
        .select(tasksUncompletedSelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toEqual([tasks[0], tasks[1], tasks[3]]);
    });
  });

  describe('tasksPrioritiesSelector', () => {
    it('should return tasks with existing priorities', () => {
      let result: Task[];

      store$
        .select(tasksPrioritiesSelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetPrioritiesSuccess([priorities[0]]));

      expect(result).toEqual([tasks[1]]);
    });
  });

  describe('tasksCategorySelector', () => {
    it('should return tasks with existing categories', () => {
      let result: Task[];

      store$
        .select(tasksCategorySelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetCategoriesSuccess(categories));
      store$.dispatch(new SelectCategory(categories[1]));
      expect(result).toEqual([tasks[2], tasks[3]]);

      store$.dispatch(new SelectCategory(null));
      expect(result).toEqual(tasks);

      store$.dispatch(new SelectCategory({} as Category));
      expect(result).toEqual([tasks[0], tasks[4]]);
    });
  });

  describe('tasksCategoryCompletedSelector', () => {
    it('should return tasks with existing categories and completed state', () => {
      let result: Task[];

      store$
        .select(tasksCategoryCompletedSelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetCategoriesSuccess(categories));
      expect(result).toEqual([tasks[2], tasks[4]]);

      store$.dispatch(new SelectCategory(categories[1]));
      expect(result).toEqual([tasks[2]]);

      store$.dispatch(new SelectCategory({} as Category));
      expect(result).toEqual([tasks[4]]);

      store$.dispatch(new UpdateTaskSuccess({ ...tasks[4], completed: false }));
      expect(result).toEqual([]);
    });
  });

  describe('tasksFilteredSelector', () => {
    it('should return filtered tasks array', () => {
      let result: Task[];

      store$
        .select(tasksFilteredSelector)
        .subscribe((tasks: Task[]) => result = tasks);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetPrioritiesSuccess(priorities));
      store$.dispatch(new GetCategoriesSuccess(categories));
      expect(result).toEqual(tasks);

      store$.dispatch(new FilterTasks({ completed: true, q: null, priority: null }));
      expect(result).toEqual([tasks[2], tasks[4]]);

      store$.dispatch(new FilterTasks({ completed: true, q: null, priority: '0' }));
      expect(result).toEqual([tasks[4]]);

      store$.dispatch(new FilterTasks({ completed: false, q: 'to', priority: null }));
      expect(result).toEqual([tasks[1], tasks[3]]);

      store$.dispatch(new SelectCategory(categories[0]));
      expect(result).toEqual([tasks[1]]);
    });
  });

  describe('tasksStatisticsSelector', () => {
    it('should return tasks statistic', () => {
      let result: TasksStatistics;

      store$
        .select(tasksStatisticsSelector)
        .subscribe((statistic: TasksStatistics) => result = statistic);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetCategoriesSuccess(categories));

      expect(result).toEqual({
        count: tasks.length,
        completed: 2,
        uncompleted: 3,
        completedValue: 2 / tasks.length,
        uncompletedValue: 3 / tasks.length,
      });

      store$.dispatch(new SelectCategory(categories[1]));

      expect(result).toEqual({
        count: 2,
        completed: 1,
        uncompleted: 1,
        completedValue: 1 / 2,
        uncompletedValue: 1 / 2,
      });
    });
  });

  describe('tasksUncompletedCountSelector', () => {
    it('should return tasks uncompleted count and entities', () => {
      let result: TasksUncompletedCount;

      store$
        .select(tasksUncompletedCountSelector)
        .subscribe((statistic: TasksUncompletedCount) => result = statistic);

      store$.dispatch(new GetTasksSuccess(tasks));
      store$.dispatch(new GetCategoriesSuccess(categories));

      expect(result).toEqual({
        count: 3,
        entities: {
          0: 1,
          1: 1,
          2: 1,
        },
      });

      store$.dispatch(new UpdateTaskSuccess({ ...tasks[3], category: '1' }));

      expect(result).toEqual({
        count: 3,
        entities: {
          0: 1,
          1: 2,
        },
      });
    });
  });

  describe('tasksPrioritiesCountSelector', () => {
    it('should return tasks priorities count', () => {
      let result: { [key: string]: number };

      store$
        .select(tasksPrioritiesCountSelector)
        .subscribe((statistic: { [key: string]: number }) => result = statistic);

      store$.dispatch(new GetTasksSuccess(tasks));
      expect(result).toEqual({ 0: 5 });

      store$.dispatch(new GetPrioritiesSuccess(priorities));
      expect(result).toEqual({
        0: 1,
        1: 1,
        2: 1,
        3: 2
      });
    });
  });
});
