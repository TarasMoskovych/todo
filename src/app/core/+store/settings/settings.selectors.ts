import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './settings.state';

const getPriorities = (state: SettingsState) => state.priorities;

export const geSettingsState = createFeatureSelector<SettingsState>('settings');
export const getPrioritiesState = createSelector(geSettingsState, getPriorities);
