import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';

import { AppState, themesDarkThemeSelector } from './core/+store';
import { ThemesService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private store: Store<AppState>,
    private deviceService: DeviceDetectorService,
    private themesService: ThemesService,
  ) { }

  ngOnInit() {
    this.store.select(themesDarkThemeSelector)
      .subscribe((darkTheme: boolean) => this.themesService.toggleDarkTheme(darkTheme));
  }
}
