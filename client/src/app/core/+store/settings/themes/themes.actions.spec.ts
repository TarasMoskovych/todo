import { Theme } from 'src/app/models';
import {
  ThemesActionTypes,
  ThemesActions,
  ToggleThemesDialog,
  ToggleDarkTheme,
  GetTheme,
  GetThemeSuccess,
  GetThemeError,
  SetColor,
  SetImage,
} from './themes.actions';

const error = 'Some error message';
const theme: Theme = {
  color: {
    name: 'black',
    value: '#000'
  },
  darkTheme: false,
  image: 'assets/images/img1.png',
};

describe('ThemesActions', () => {

  it('should create ToggleThemesDialog', () => {
    const action: ThemesActions = new ToggleThemesDialog(true);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(true);
    expect(action.type).toBe(ThemesActionTypes.TOGGLE_THEMES_DIALOG);
  });

  it('should create ToggleDarkTheme', () => {
    const action: ThemesActions = new ToggleDarkTheme(false);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(false);
    expect(action.type).toBe(ThemesActionTypes.TOGGLE_DARK_THEME);
  });

  it('should create GetTheme', () => {
    const action: ThemesActions = new GetTheme();
    expect(action).toBeTruthy();
    expect(action.type).toBe(ThemesActionTypes.GET_THEME);
  });

  it('should create GetThemeSuccess', () => {
    const action: ThemesActions = new GetThemeSuccess(theme);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(theme);
    expect(action.type).toBe(ThemesActionTypes.GET_THEME_SUCCESS);
  });

  it('should create GetThemeError', () => {
    const action: ThemesActions = new GetThemeError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(ThemesActionTypes.GET_THEME_ERROR);
  });

  it('should create SetColor', () => {
    const action: ThemesActions = new SetColor(theme.color);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(theme.color);
    expect(action.type).toBe(ThemesActionTypes.SET_COLOR);
  });

  it('should create SetImage', () => {
    const action: ThemesActions = new SetImage(theme.image);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(theme.image);
    expect(action.type).toBe(ThemesActionTypes.SET_IMAGE);
  });
});
