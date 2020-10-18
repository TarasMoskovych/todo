import { Priority } from 'src/app/models';

export interface PriorityEntity {
  [id: number]: Priority;
}

export interface PrioritiesState {
  entities: PriorityEntity;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialPrioritiesState: PrioritiesState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};
