import { ActionReducerMap } from '@ngrx/store';
import { prioritiesReducer, PrioritiesState, PrioritiesEffects } from './priorities';
import { ThemesEffects, themesReducer, ThemesState } from './themes';

export interface SettingsState {
  priorities: PrioritiesState;
  themes: ThemesState;
}

export const settingsReducers: ActionReducerMap<SettingsState> = {
  priorities: prioritiesReducer,
  themes: themesReducer,
};

export const settingsEffects = [
  PrioritiesEffects,
  ThemesEffects,
];
