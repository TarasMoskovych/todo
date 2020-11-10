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

    case ThemesActionTypes.TOGGLE_DARK_THEME: {
      const darkTheme = action.payload;

      return {
        ...state,
        darkTheme,
      };
    }

    case ThemesActionTypes.GET_THEME_SUCCESS: {
      const { color, darkTheme, image } = action.payload;

      return {
        ...state,
        color,
        darkTheme,
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
