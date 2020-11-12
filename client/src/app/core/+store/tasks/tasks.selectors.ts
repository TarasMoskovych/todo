import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './';
import { categoriesSelectedSelector } from '../categories';
import { Task, Category, TaskFilter, TasksStatistics, TasksUncompletedCount, TaskCountEntity } from 'src/app/models';
import { Constants } from 'src/app/shared/classes';
import { taskAdapter } from './tasks.state';

const getFilter    = (state: TasksState) => state.filter;
const getStatistic = (state: TasksState) => state.statistic;
const getError     = (state: TasksState) => state.error;
const getLoaded    = (state: TasksState) => state.loaded;
const getLoading   = (state: TasksState) => state.loading;

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const { selectEntities: tasksEntitiesSelector, selectAll: tasksSelector, selectTotal: tasksTotal } = taskAdapter.getSelectors(getTasksState);
export const tasksFilterSelector = createSelector(getTasksState, getFilter);
export const tasksShowStatisticSelector = createSelector(getTasksState, getStatistic);
export const tasksErrorSelector = createSelector(getTasksState, getError);
export const tasksLoadedSelector = createSelector(getTasksState, getLoaded);
export const tasksLoadingSelector = createSelector(getTasksState, getLoading);

export const tasksUncompletedSelector = createSelector(
  tasksSelector,
  (tasks: Task[]) => tasks.filter((task: Task) => !task.completed)
);

export const tasksPrioritiesSelector = createSelector(
  tasksSelector,
  (tasks: Task[]) => tasks.filter((task: Task) => task.priority)
);

export const tasksCategorySelector = createSelector(
  tasksSelector,
  categoriesSelectedSelector,
  (tasks: Task[], category: Category) => tasks.filter((task: Task) => category ? task.category === category.id : task)
);

export const tasksCategoryCompletedSelector = createSelector(
  tasksCategorySelector,
  (tasks: Task[]) => tasks.filter((task: Task) => task.completed)
);

export const tasksFilteredSelector = createSelector(
  tasksCategorySelector,
  tasksFilterSelector,
  (tasks: Task[], filter: TaskFilter) => tasks
    .filter((task: Task) => {
      // Filter by status
      if ((filter.completed || filter.completed === false) && (filter.completed && !task.completed || filter.completed === false && task.completed)) { return false; }
      // Filter by query
      if (filter.q && task.name.search(new RegExp(filter.q, 'i')) === -1) { return false; }
      // Filter by priorities
      if (filter.priority && (filter.priority !== task.priority && filter.priority !== '0' || filter.priority === '0' && task.priority)) { return false; }
      return true;
    })
);

export const tasksStatisticsSelector = createSelector(
  tasksCategorySelector,
  tasksCategoryCompletedSelector,
  (tasks: Task[], completedTasks: Task[]): TasksStatistics => {
    const count = tasks.length;
    const completed = completedTasks.length;
    const uncompleted = tasks.length - completed;

    return {
      count,
      completed,
      completedValue: completed / count,
      uncompleted,
      uncompletedValue: uncompleted / count,
    };
  }
);

export const tasksUncompletedCountSelector = createSelector(
  tasksUncompletedSelector,
  (tasks: Task[]): TasksUncompletedCount => {
    return {
      count: tasks.length,
      entities: tasks.reduce((acc: TaskCountEntity, task: Task) => {
        if (!task.category) {
          if (acc['0']) {
            acc['0']++;
          } else {
            acc['0'] = 1;
          }
          return acc;
        }

        if (!acc[task.category]) {
          acc[task.category] = 1;
        } else {
          acc[task.category]++;
        }
        return acc;
      }, {}),
    };
  }
);

export const tasksPrioritiesCountSelector = createSelector(
  tasksPrioritiesSelector,
  tasksTotal,
  (tasks: Task[], total: number) => tasks.reduce((acc, task: Task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = 1;
    } else {
      acc[task.priority]++;
    }
    return acc;
  }, { '0': total - tasks.length })
);
