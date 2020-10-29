import { createSelector } from '@ngrx/store';
import { getThemesState } from '../settings.selectors';
import { ThemesState } from './themes.state';

const getShowDialog = (state: ThemesState) => state.showDialog;
const getColor      = (state: ThemesState) => state.color;
const getImage      = (state: ThemesState) => state.image;

export const themesShowDialogSelector = createSelector(getThemesState, getShowDialog);
export const themesColorSelector = createSelector(getThemesState, getColor);
export const themesImageSelector = createSelector(getThemesState, getImage);
