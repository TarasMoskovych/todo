import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, TaskEntity } from './';
import { categoriesSelectedSelector } from '../categories';
import { Task, Category, TaskFilter, TasksStatistics } from 'src/app/models';
import { Constants } from 'src/app/shared/classes';

const getEntities  = (state: TasksState) => state.entities;
const getFilter    = (state: TasksState) => state.filter;
const getStatistic = (state: TasksState) => state.statistic;
const getError     = (state: TasksState) => state.error;
const getLoaded    = (state: TasksState) => state.loaded;
const getLoading   = (state: TasksState) => state.loading;

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const tasksEntitiesSelector = createSelector(getTasksState, getEntities);
export const tasksFilterSelector = createSelector(getTasksState, getFilter);
export const tasksShowStatisticSelector = createSelector(getTasksState, getStatistic);
export const tasksErrorSelector = createSelector(getTasksState, getError);
export const tasksLoadedSelector = createSelector(getTasksState, getLoaded);
export const tasksLoadingSelector = createSelector(getTasksState, getLoading);
export const tasksSelector = createSelector(
  tasksEntitiesSelector,
  (entities: TaskEntity) => Object.keys(entities).map((id: string) => entities[id])
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
      if (filter.status && (filter.status === 'completed' && !task.completed || filter.status === 'uncompleted' && task.completed)) { return false; }
      // Filter by query
      if (filter.query && task.name.search(new RegExp(filter.query, 'i')) === -1) { return false; }
      // Filter by priorities
      if (filter.priority && (filter.priority !== task.priorityId && filter.priority !== Constants.WITHOUT_PRIORITY || filter.priority === Constants.WITHOUT_PRIORITY && task.priorityId)) { return false; }
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
)
