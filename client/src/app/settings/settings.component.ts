import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  AppState,
  GetPriorities,
  GetTheme,
  SetColor,
  SetImage,
  themesColorSelector,
  themesImageSelector,
  themesShowDialogSelector,
  ToggleThemesDialog
} from '../core/+store';
import { PrioritiesDialogComponent } from './components';
import { Color } from '../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  color$: Observable<Color> = this.store.select(themesColorSelector);
  image$: Observable<string> = this.store.select(themesImageSelector);
  showDialog$: Observable<boolean> = this.store.select(themesShowDialogSelector);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getPriorities();
    this.getTheme();
  }

  onPrioritiesDialogOpen() {
    this.onToggleDialog(false);

    this.dialog.open(PrioritiesDialogComponent, { width: '50%' });
  }

  onSetColor(color: Color) {
    this.store.dispatch(new SetColor(color));
  }

  onSetImage(src: string) {
    this.store.dispatch(new SetImage(src));
  }

  onToggleDialog(toggler: boolean) {
    this.store.dispatch(new ToggleThemesDialog(toggler));
  }

  private getPriorities() {
    this.store.dispatch(new GetPriorities());
  }

  private getTheme() {
    this.store.dispatch(new GetTheme());
  }

}
