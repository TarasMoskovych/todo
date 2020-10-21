import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AppState, GetPriorities, themesShowDialogSelector, ToggleThemesDialog } from '../core/+store';
import { PrioritiesDialogComponent } from './components';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  showDialog$: Observable<boolean> = this.store.select(themesShowDialogSelector);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getPriorities();
  }

  onPrioritiesDialogOpen() {
    this.onToggleDialog(false);

    this.dialog.open(PrioritiesDialogComponent, { width: '50%' });
  }

  onToggleDialog(toggler: boolean) {
    this.store.dispatch(new ToggleThemesDialog(toggler));
  }

  private getPriorities() {
    this.store.dispatch(new GetPriorities());
  }

}
