import { Color, Theme } from 'src/app/models';
import { themesReducer } from './themes.reducer';
import { initialThemesState } from './themes.state';
import { GetThemeSuccess, SetColor, SetImage, ToggleDarkTheme, ToggleThemesDialog } from './themes.actions';

describe('ThemesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = themesReducer(undefined, {} as any);

      expect(state).toBe(initialThemesState);
    });
  });

  describe('TOGGLE_THEMES_DIALOG action', () => {
    it('should return showDialog true', () => {
      const state = themesReducer(initialThemesState, new ToggleThemesDialog(true));

      expect(state.showDialog).toBeTrue();
    });

    it('should return showDialog false', () => {
      const state = themesReducer(initialThemesState, new ToggleThemesDialog(false));

      expect(state.showDialog).toBeFalse();
    });
  });

  describe('TOGGLE_DARK_THEME action', () => {
    it('should return darkTheme true', () => {
      const state = themesReducer(initialThemesState, new ToggleDarkTheme(true));

      expect(state.darkTheme).toBeTrue();
    });

    it('should return darkTheme false', () => {
      const state = themesReducer(initialThemesState, new ToggleDarkTheme(false));

      expect(state.darkTheme).toBeFalse();
    });
  });

  describe('GET_THEME_SUCCESS action', () => {
    it('should populate theme', () => {
      const theme: Theme = {
        color: {
          name: 'dark',
          value: '#555',
        },
        darkTheme: true,
        image: 'assets/images/bg_1.jpg',
      };
      const state = themesReducer(initialThemesState, new GetThemeSuccess(theme));

      expect(state.color).toEqual(theme.color);
      expect(state.darkTheme).toEqual(theme.darkTheme);
      expect(state.image).toEqual(theme.image);
    });
  });

  describe('SET_COLOR action', () => {
    it('should populate color', () => {
      const color: Color = {
        name: 'dark',
        value: '#555',
      };
      const state = themesReducer(initialThemesState, new SetColor(color));

      expect(state.color).toEqual(color);
    });
  });

  describe('SET_IMAGE action', () => {
    it('should populate image', () => {
      const src = 'assets/images/bg_1.jpg';
      const state = themesReducer(initialThemesState, new SetImage(src));

      expect(state.image).toEqual(src);
    });
  });
});
