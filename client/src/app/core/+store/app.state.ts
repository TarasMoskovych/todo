import { StoreModule } from '@ngrx/store';

import { categoriesReducer, CategoriesState } from './categories';
import { settingsReducers } from './settings';
import { tasksReducer, TasksState } from './tasks';

export interface AppState {
  categories: CategoriesState;
  tasks: TasksState;
}

export const registerStore = () => [
  StoreModule.forRoot({}),
  StoreModule.forFeature('categories', categoriesReducer),
  StoreModule.forFeature('tasks', tasksReducer),
  StoreModule.forFeature('settings', settingsReducers),
];
