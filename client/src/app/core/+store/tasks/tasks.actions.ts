import { Action } from '@ngrx/store';

import { Task, TaskFilter } from 'src/app/models';

export enum TasksActionTypes {
  GET_TASKS          = '[Tasks] GET_TASKS',
  GET_TASKS_SUCCESS  = '[Tasks] GET_TASKS_SUCCESS',
  GET_TASKS_ERROR    = '[Tasks] GET_TASKS_ERROR',

  CREATE_TASK         = '[Tasks] CREATE_TASK',
  CREATE_TASK_SUCCESS = '[Tasks] CREATE_TASK_SUCCESS',
  CREATE_TASK_ERROR   = '[Tasks] CREATE_TASK_ERROR',

  UPDATE_TASK         = '[Tasks] UPDATE_TASK',
  UPDATE_TASK_SUCCESS = '[Tasks] UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR   = '[Tasks] UPDATE_TASK_ERROR',

  REMOVE_TASK         = '[Tasks] REMOVE_TASK',
  REMOVE_TASK_SUCCESS = '[Tasks] REMOVE_TASK_SUCCESS',
  REMOVE_TASK_ERROR   = '[Tasks] REMOVE_TASK_ERROR',

  FILTER_TASKS        = '[Tasks] FILTER_TASKS',
  TOGGLE_STATISTIC    = '[Tasks] TOGGLE_STATISTIC',
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;
}

export class GetTasksSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASKS_SUCCESS;
  constructor(public payload: Task[]) { }
}

export class GetTasksError implements Action {
  readonly type = TasksActionTypes.GET_TASKS_ERROR;
  constructor(public payload: Error | string) { }
}

export class CreateTask implements Action {
  readonly type = TasksActionTypes.CREATE_TASK;
  constructor(public payload: Task) { }
}

export class CreateTaskSuccess implements Action {
  readonly type = TasksActionTypes.CREATE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class CreateTaskError implements Action {
  readonly type = TasksActionTypes.CREATE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;
  constructor(public payload: Task) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class UpdateTaskError implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class RemoveTask implements Action {
  readonly type = TasksActionTypes.REMOVE_TASK;
  constructor(public payload: Task) { }
}

export class RemoveTaskSuccess implements Action {
  readonly type = TasksActionTypes.REMOVE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class RemoveTaskError implements Action {
  readonly type = TasksActionTypes.REMOVE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class FilterTasks implements Action {
  readonly type = TasksActionTypes.FILTER_TASKS;
  constructor(public payload: TaskFilter) { }
}

export class ToggleStatistic implements Action {
  readonly type = TasksActionTypes.TOGGLE_STATISTIC;
  constructor(public payload: boolean) { }
}

export type TasksActions
  = GetTasks
  | GetTasksSuccess
  | GetTasksError
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskError
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskError
  | RemoveTask
  | RemoveTaskSuccess
  | RemoveTaskError
  | FilterTasks
  | ToggleStatistic;
