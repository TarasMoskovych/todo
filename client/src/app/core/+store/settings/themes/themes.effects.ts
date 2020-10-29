import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { ThemesActionTypes } from './themes.actions';
import * as themesActions from './themes.actions';
import { ThemesService } from 'src/app/core/services';
import { Color, Theme } from 'src/app/models';

@Injectable()
export class ThemesEffects {
  constructor(
    private actions$: Actions,
    private themesService: ThemesService,
  ) {}

  @Effect()
  getTheme$: Observable<Action> = this.actions$.pipe(
    ofType<themesActions.GetTheme>(ThemesActionTypes.GET_THEME),
    switchMap(() => {
      return of(this.themesService
        .get())
        .pipe(
          map((theme: Theme) => new themesActions.GetThemeSuccess(theme)),
          catchError((err: any) => of(new themesActions.GetThemeError(err)))
        )
    })
  );

  @Effect({ dispatch: false })
  setColor$ = this.actions$.pipe(
    ofType<themesActions.SetColor>(ThemesActionTypes.SET_COLOR),
    pluck('payload'),
    tap((color: Color) => this.themesService.save('color', color))
  );

  @Effect({ dispatch: false })
  setImage$ = this.actions$.pipe(
    ofType<themesActions.SetImage>(ThemesActionTypes.SET_IMAGE),
    pluck('payload'),
    tap((image: string) => this.themesService.save('image', image))
  );
}
