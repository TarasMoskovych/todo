import { Action } from '@ngrx/store';

import { Priority } from 'src/app/models';

export enum PrioritiesActionTypes {
  GET_PRIORITIES         = '[Priorities] GET_PRIORITIES',
  GET_PRIORITIES_SUCCESS = '[Priorities] GET_PRIORITIES_SUCCESS',
  GET_PRIORITIES_ERROR   = '[Priorities] GET_PRIORITIES_ERROR',
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

export type PrioritiesActions
  = GetPriorities
  | GetPrioritiesSuccess
  | GetPrioritiesError;
