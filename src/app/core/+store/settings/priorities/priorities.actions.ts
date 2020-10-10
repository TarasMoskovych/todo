import { Action } from '@ngrx/store';

import { Priority } from 'src/app/models';

export enum PrioritiesActionTypes {
  GET_PRIORITIES          = '[Priorities] GET_PRIORITIES',
  GET_PRIORITIES_SUCCESS  = '[Priorities] GET_PRIORITIES_SUCCESS',
  GET_PRIORITIES_ERROR    = '[Priorities] GET_PRIORITIES_ERROR',

  CREATE_PRIORITY         = '[Priorities] CREATE_PRIORITY',
  CREATE_PRIORITY_SUCCESS = '[Priorities] CREATE_PRIORITY_SUCCESS',
  CREATE_PRIORITY_ERROR   = '[Priorities] CREATE_PRIORITY_ERROR',

  UPDATE_PRIORITY         = '[Priorities] UPDATE_PRIORITY',
  UPDATE_PRIORITY_SUCCESS = '[Priorities] UPDATE_PRIORITY_SUCCESS',
  UPDATE_PRIORITY_ERROR   = '[Priorities] UPDATE_PRIORITY_ERROR',

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

export class CreatePriority implements Action {
  readonly type = PrioritiesActionTypes.CREATE_PRIORITY;
  constructor(public payload: Priority) { }
}

export class CreatePrioritySuccess implements Action {
  readonly type = PrioritiesActionTypes.CREATE_PRIORITY_SUCCESS;
  constructor(public payload: Priority) { }
}

export class CreatePriorityError implements Action {
  readonly type = PrioritiesActionTypes.CREATE_PRIORITY_ERROR;
  constructor(public payload: Error | string) { }
}

export class UpdatePriority implements Action {
  readonly type = PrioritiesActionTypes.UPDATE_PRIORITY;
  constructor(public payload: Priority) { }
}

export class UpdatePrioritySuccess implements Action {
  readonly type = PrioritiesActionTypes.UPDATE_PRIORITY_SUCCESS;
  constructor(public payload: Priority) { }
}

export class UpdatePriorityError implements Action {
  readonly type = PrioritiesActionTypes.UPDATE_PRIORITY_ERROR;
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
  | CreatePriority
  | CreatePrioritySuccess
  | CreatePriorityError
  | UpdatePriority
  | UpdatePrioritySuccess
  | UpdatePriorityError
  | RemovePriority
  | RemovePrioritySuccess
  | RemovePriorityError;
