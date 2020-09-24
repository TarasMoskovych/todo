import { ActionReducerMap } from '@ngrx/store';
import { prioritiesReducer, PrioritiesState, PrioritiesEffects } from './priorities';

export interface SettingsState {
  priorities: PrioritiesState;
}

export const settingsReducers: ActionReducerMap<SettingsState> = {
  priorities: prioritiesReducer,
};

export const settingsEffects = [
  PrioritiesEffects,
];
