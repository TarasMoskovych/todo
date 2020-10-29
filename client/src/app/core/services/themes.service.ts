import { Injectable } from '@angular/core';

import { Color, Theme } from 'src/app/models';
import { Constants } from 'src/app/shared/classes';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ThemesService {
  private readonly STORAGE_KEY = `${Constants.STORAGE_KEY}:themes`;
  private readonly defaultColor = Constants.THEME_COLORS[0];
  private readonly defaultImage = Constants.THEME_IMAGES[0];

  save(key: string, value: string | Color): void {
    const data = this.get() || {};
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...data, [key]: value }));
  }

  get(): Theme {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || { color: this.defaultColor, image: this.defaultImage };
  }
}
