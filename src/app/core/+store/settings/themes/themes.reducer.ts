import { ThemesActions, ThemesActionTypes } from './themes.actions';
import { initialThemesState, ThemesState } from './themes.state';

export function themesReducer(state = initialThemesState, action: ThemesActions): ThemesState {

  switch (action.type) {
    case ThemesActionTypes.TOGGLE_THEMES_DIALOG: {
      const showDialog = action.payload;

      return {
        ...state,
        showDialog,
      };
    }

    default:
      return state;
  }
}
