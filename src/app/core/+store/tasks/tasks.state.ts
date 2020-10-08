import { Task, TaskFilter } from 'src/app/models';

export interface TaskEntity {
  [id: number]: Task;
}

export interface TasksState {
  entities: TaskEntity;
  filter: TaskFilter;
  statistic: boolean;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialTasksState: TasksState = {
  entities: {},
  filter: {},
  statistic: true,
  loading: false,
  loaded: false,
  error: null,
};
