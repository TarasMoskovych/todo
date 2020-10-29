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

    case ThemesActionTypes.GET_THEME_SUCCESS: {
      const { color, image } = action.payload;

      return {
        ...state,
        color,
        image,
      };
    }

    case ThemesActionTypes.SET_COLOR: {
      const color = action.payload;

      return {
        ...state,
        color,
      };
    }

    case ThemesActionTypes.SET_IMAGE: {
      const image = action.payload;

      return {
        ...state,
        image,
      };
    }

    default:
      return state;
  }
}
