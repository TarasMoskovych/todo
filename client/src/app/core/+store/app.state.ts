import { CategoriesState } from './categories';
import { TasksState } from './tasks';

export interface AppState {
  categories: CategoriesState;
  tasks: TasksState;
}
