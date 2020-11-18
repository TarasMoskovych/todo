import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { Color } from 'src/app/models';
import { AppState, registerStore } from '../../app.state';
import { SetColor, SetImage, ToggleDarkTheme, ToggleThemesDialog } from './themes.actions';
import {
  themesColorSelector,
  themesDarkThemeSelector,
  themesImageSelector,
  themesShowDialogSelector
} from './themes.selectors';

describe('Themes Selectors', () => {
  let store$: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...registerStore(),
      ]
    });

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch').and.callThrough();
  });

  describe('themesShowDialogSelector', () => {
    it('should return themes showDialog', () => {
      let result: boolean;

      store$
        .select(themesShowDialogSelector)
        .subscribe((show: boolean) => result = show);

      expect(result).toBeFalse();

      store$.dispatch(new ToggleThemesDialog(true));
      expect(result).toBeTrue();
    });
  });

  describe('themesColorSelector', () => {
    it('should return themes color', () => {
      const color: Color = {
        name: 'dark_color',
        value: '#555',
      };
      let result: Color;

      store$
        .select(themesColorSelector)
        .subscribe((color: Color) => result = color);

      expect(result).toBeNull();

      store$.dispatch(new SetColor(color));
      expect(result).toEqual(color);
    });
  });

  describe('themesImageSelector', () => {
    it('should return themes image', () => {
      const src = 'assets/images/bg_1.jpg';
      let result: string;

      store$
        .select(themesImageSelector)
        .subscribe((src: string) => result = src);

      expect(result).toBeNull();

      store$.dispatch(new SetImage(src));
      expect(result).toEqual(src);
    });
  });

  describe('themesDarkThemeSelector', () => {
    it('should return themes dark theme', () => {
      let result: boolean;

      store$
        .select(themesDarkThemeSelector)
        .subscribe((dark: boolean) => result = dark);

      expect(result).toBeFalse();

      store$.dispatch(new ToggleDarkTheme(true));
      expect(result).toBeTrue();
    });
  });
});
