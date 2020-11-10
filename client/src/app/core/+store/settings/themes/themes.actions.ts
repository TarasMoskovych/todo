import { Action } from '@ngrx/store';
import { Color, Theme } from 'src/app/models';

export enum ThemesActionTypes {
  TOGGLE_THEMES_DIALOG = '[Themes] TOGGLE_THEMES_DIALOG',
  TOGGLE_DARK_THEME    = '[Themes] TOGGLE_DARK_THEME',

  GET_THEME            = '[Themes] GET_THEME',
  GET_THEME_SUCCESS    = '[Themes] GET_THEME_SUCCESS',
  GET_THEME_ERROR      = '[Themes] GET_THEME_ERROR',

  SET_COLOR            = '[Themes] SET_COLOR',
  SET_IMAGE            = '[Themes] SET_IMAGE',
}

export class ToggleThemesDialog implements Action {
  readonly type = ThemesActionTypes.TOGGLE_THEMES_DIALOG;
  constructor(public payload: boolean) { }
}

export class ToggleDarkTheme implements Action {
  readonly type = ThemesActionTypes.TOGGLE_DARK_THEME;
  constructor(public payload: boolean) { }
}

export class GetTheme implements Action {
  readonly type = ThemesActionTypes.GET_THEME;
}

export class GetThemeSuccess implements Action {
  readonly type = ThemesActionTypes.GET_THEME_SUCCESS;
  constructor(public payload: Theme) { }
}

export class GetThemeError implements Action {
  readonly type = ThemesActionTypes.GET_THEME_ERROR;
  constructor(public payload: any) { }
}

export class SetColor implements Action {
  readonly type = ThemesActionTypes.SET_COLOR;
  constructor(public payload: Color) { }
}

export class SetImage implements Action {
  readonly type = ThemesActionTypes.SET_IMAGE;
  constructor(public payload: string) { }
}

export type ThemesActions
  = ToggleThemesDialog
  | ToggleDarkTheme
  | GetTheme
  | GetThemeSuccess
  | GetThemeError
  | SetColor
  | SetImage;
