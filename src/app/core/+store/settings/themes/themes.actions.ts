import { Action } from '@ngrx/store';

export enum ThemesActionTypes {
  TOGGLE_THEMES_DIALOG = '[Themes] TOGGLE_THEMES_DIALOG',
}

export class ToggleThemesDialog implements Action {
  readonly type = ThemesActionTypes.TOGGLE_THEMES_DIALOG;
  constructor(public payload: boolean) { }
}

export type ThemesActions
  = ToggleThemesDialog;
