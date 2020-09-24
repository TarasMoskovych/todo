import { createSelector } from '@ngrx/store';
import { getPrioritiesState } from '../settings.selectors';
import { PrioritiesState } from './';
import { PriorityEntity } from './priorities.state';

const getEntities = (state: PrioritiesState) => state.entities;
const getError    = (state: PrioritiesState) => state.error;
const getLoaded   = (state: PrioritiesState) => state.loaded;
const getLoading  = (state: PrioritiesState) => state.loading;

export const prioritiesEntitiesSelector = createSelector(getPrioritiesState, getEntities);
export const prioritiesErrorSelector = createSelector(getPrioritiesState, getError);
export const prioritiesLoadedSelector = createSelector(getPrioritiesState, getLoaded);
export const prioritiesLoadingSelector = createSelector(getPrioritiesState, getLoading);
export const prioritiesSelector = createSelector(
  prioritiesEntitiesSelector,
  (entities: PriorityEntity) => Object.keys(entities).map((id: string) => entities[id])
);
