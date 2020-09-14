import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, TaskEntity } from './';

const getEntities = (state: TasksState) => state.entities;
const getError    = (state: TasksState) => state.error;
const getLoaded   = (state: TasksState) => state.loaded;
const getLoading  = (state: TasksState) => state.loading;

export const getTasksState = createFeatureSelector<TasksState>('tasks');
export const tasksEntitiesSelector = createSelector(getTasksState, getEntities);
export const tasksErrorSelector = createSelector(getTasksState, getError);
export const tasksLoadedSelector = createSelector(getTasksState, getLoaded);
export const tasksLoadingSelector = createSelector(getTasksState, getLoading);
export const tasksSelector = createSelector(
  tasksEntitiesSelector,
  (entities: TaskEntity) => Object.keys(entities).map((id: string) => entities[id])
);
