import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task, TaskFilter } from 'src/app/models';

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export interface TasksState extends EntityState<Task>  {
  readonly filter: TaskFilter;
  readonly statistic: boolean;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialTasksState: TasksState = taskAdapter.getInitialState({
  filter: {},
  statistic: false,
  loading: false,
  loaded: false,
  error: null,
});
