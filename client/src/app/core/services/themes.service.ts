import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  save(key: string, value: string | Color | boolean): void {
    const data = this.get() || {};
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...data, [key]: value }));
  }

  get(): Theme {
    let theme: Theme = null;

    try {
      theme = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || { color: this.defaultColor, image: this.defaultImage };
    } catch(e) {}

    return theme;
  }

  toggleDarkTheme(darkTheme: boolean) {
    this.renderer[darkTheme ? 'addClass': 'removeClass'](this.document.body, 'dark-edition');
  }
}
