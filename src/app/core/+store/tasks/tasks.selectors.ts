import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, TaskEntity } from './';
import { categoriesSelectedSelector } from '../categories';
import { Task, Category } from 'src/app/models';

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
  categoriesSelectedSelector,
  (entities: TaskEntity, category: Category) => Object
    .keys(entities)
    .map((id: string) => entities[id])
    .filter((task: Task) => category ? task.category === category.id : task)
);
