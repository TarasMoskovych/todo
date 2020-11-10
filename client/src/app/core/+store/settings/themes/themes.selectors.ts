import { createSelector } from '@ngrx/store';
import { getThemesState } from '../settings.selectors';
import { ThemesState } from './themes.state';

const getShowDialog = (state: ThemesState) => state.showDialog;
const getColor      = (state: ThemesState) => state.color;
const getImage      = (state: ThemesState) => state.image;
const getDarkTheme  = (state: ThemesState) => state.darkTheme;

export const themesShowDialogSelector = createSelector(getThemesState, getShowDialog);
export const themesColorSelector = createSelector(getThemesState, getColor);
export const themesImageSelector = createSelector(getThemesState, getImage);
export const themesDarkThemeSelector = createSelector(getThemesState, getDarkTheme);
