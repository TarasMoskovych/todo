import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, TaskEntity } from './';
import { categoriesSelectedSelector } from '../categories';
import { Task, Category, TaskFilter } from 'src/app/models';
import { Constants } from 'src/app/shared';

const getEntities = (state: TasksState) => state.entities;
const getFilter   = (state: TasksState) => state.filter;
const getError    = (state: TasksState) => state.error;
const getLoaded   = (state: TasksState) => state.loaded;
const getLoading  = (state: TasksState) => state.loading;

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const tasksEntitiesSelector = createSelector(getTasksState, getEntities);
export const tasksFilterSelector = createSelector(getTasksState, getFilter);
export const tasksErrorSelector = createSelector(getTasksState, getError);
export const tasksLoadedSelector = createSelector(getTasksState, getLoaded);
export const tasksLoadingSelector = createSelector(getTasksState, getLoading);
export const tasksSelector = createSelector(
  tasksEntitiesSelector,
  categoriesSelectedSelector,
  tasksFilterSelector,
  (entities: TaskEntity, category: Category, filter: TaskFilter) => Object
    .keys(entities)
    .map((id: string) => entities[id])
    .filter((task: Task) => {
      // Filter in selected category
      if (category && category.id !== task.category ) { return false; }
      // Filter by status
      if (filter.status && (filter.status === 'completed' && !task.completed || filter.status === 'uncompleted' && task.completed)) { return false; }
      // Filter by query
      if (filter.query && task.name.search(new RegExp(filter.query, 'i')) === -1) { return false; }
      // Filter by priorities
      if (filter.priority && (filter.priority !== task.priorityId && filter.priority !== Constants.WITHOUT_PRIORITY || filter.priority === Constants.WITHOUT_PRIORITY && task.priorityId)) { return false; }
      return true;
    })
);
