import { Task } from 'src/app/models';

export interface TaskEntity {
  [id: number]: Task;
}

export interface TasksState {
  entities: TaskEntity;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialTasksState: TasksState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};
