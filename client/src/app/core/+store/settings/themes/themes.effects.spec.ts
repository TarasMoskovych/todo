import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';

import { ThemesEffects } from './themes.effects';
import { ThemesService } from 'src/app/core/services';
import { Theme } from 'src/app/models';
import * as themesActions from './themes.actions';

const assert = (effect$: Observable<Action>, expected: TestColdObservable) => expect(effect$).toBeObservable(expected);
const theme: Theme = {
  color: {
    name: 'black',
    value: '#000',
  },
  darkTheme: false,
  image: 'img.jpg',
};

describe('ThemesEffects', () => {
  let actions$: Observable<Action>;
  let effects: ThemesEffects;
  let themesServiceSpy: jasmine.SpyObj<ThemesService>;

  beforeEach(() => {
    themesServiceSpy = jasmine.createSpyObj('ThemesService', ['get', 'save']);

    TestBed.configureTestingModule({
      providers: [
        ThemesEffects,
        provideMockActions(() => actions$),
        { provide: ThemesService, useValue: themesServiceSpy },
      ],
    });

    effects = TestBed.inject(ThemesEffects);
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getTheme$', () => {
    it('should dispatch GetThemeSuccess', () => {
      themesServiceSpy.get.and.returnValue(theme);

      actions$ = hot('-a', { a: new themesActions.GetTheme() });
      assert(effects.getTheme$, cold('-b', { b: new themesActions.GetThemeSuccess(theme) }));
    });

    it('should dispatch GetThemeError', () => {
      themesServiceSpy.get.and.returnValue(null);

      actions$ = hot('-a', { a: new themesActions.GetTheme() });
      assert(effects.getTheme$, cold('-b', { b: new themesActions.GetThemeError(new Error('Theme is not defined')) }));
    });
  });

  describe('setColor$', () => {
    it('should save color', () => {
      actions$ = of(new themesActions.SetColor(theme.color));
      effects.setColor$.subscribe();

      expect(themesServiceSpy.save).toHaveBeenCalledWith('color', theme.color);
    });
  });

  describe('setImage$', () => {
    it('should save image', () => {
      actions$ = of(new themesActions.SetImage(theme.image));
      effects.setImage$.subscribe();

      expect(themesServiceSpy.save).toHaveBeenCalledWith('image', theme.image);
    });
  });

  describe('toggleDarkTheme$', () => {
    it('should save darkTheme flag', () => {
      actions$ = of(new themesActions.ToggleDarkTheme(theme.darkTheme));
      effects.toggleDarkTheme$.subscribe();

      expect(themesServiceSpy.save).toHaveBeenCalledWith('darkTheme', theme.darkTheme);
    });
  });
});
