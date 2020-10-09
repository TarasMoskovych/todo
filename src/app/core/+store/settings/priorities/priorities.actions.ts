import { Action } from '@ngrx/store';

import { Priority } from 'src/app/models';
import { RemoveCategoryError } from '../../categories';

export enum PrioritiesActionTypes {
  GET_PRIORITIES          = '[Priorities] GET_PRIORITIES',
  GET_PRIORITIES_SUCCESS  = '[Priorities] GET_PRIORITIES_SUCCESS',
  GET_PRIORITIES_ERROR    = '[Priorities] GET_PRIORITIES_ERROR',

  REMOVE_PRIORITY         = '[Priorities] REMOVE_PRIORITY',
  REMOVE_PRIORITY_SUCCESS = '[Priorities] REMOVE_PRIORITY_SUCCESS',
  REMOVE_PRIORITY_ERROR   = '[Priorities] REMOVE_PRIORITY_ERROR',
}

export class GetPriorities implements Action {
  readonly type = PrioritiesActionTypes.GET_PRIORITIES;
}

export class GetPrioritiesSuccess implements Action {
  readonly type = PrioritiesActionTypes.GET_PRIORITIES_SUCCESS;
  constructor(public payload: Priority[]) { }
}

export class GetPrioritiesError implements Action {
  readonly type = PrioritiesActionTypes.GET_PRIORITIES_ERROR;
  constructor(public payload: Error | string) { }
}

export class RemovePriority implements Action {
  readonly type = PrioritiesActionTypes.REMOVE_PRIORITY;
  constructor(public payload: Priority) { }
}

export class RemovePrioritySuccess implements Action {
  readonly type = PrioritiesActionTypes.REMOVE_PRIORITY_SUCCESS;
  constructor(public payload: Priority) { }
}

export class RemovePriorityError implements Action {
  readonly type = PrioritiesActionTypes.REMOVE_PRIORITY_ERROR;
  constructor(public payload: Error | string) { }
}

export type PrioritiesActions
  = GetPriorities
  | GetPrioritiesSuccess
  | GetPrioritiesError
  | RemovePriority
  | RemovePrioritySuccess
  | RemoveCategoryError;
