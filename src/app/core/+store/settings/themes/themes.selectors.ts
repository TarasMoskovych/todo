import { createSelector } from '@ngrx/store';
import { getThemesState } from '../settings.selectors';
import { ThemesState } from './themes.state';

const getShowDialog = (state: ThemesState) => state.showDialog;

export const themesShowDialogSelector = createSelector(getThemesState, getShowDialog);
