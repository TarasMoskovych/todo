import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../core/+store';
import { GetPriorities } from '../core/+store/settings';
import { themesShowDialogSelector, ToggleThemesDialog } from '../core/+store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  showDialog$: Observable<boolean> = this.store.select(themesShowDialogSelector);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getPriorities();
  }

  onCloseDialog(show: boolean) {
    show && this.toggleDialog(false);
  }

  onDialogToggle(e: MouseEvent, toggler: boolean) {
    e.preventDefault();
    this.toggleDialog(toggler);
  }

  private toggleDialog(toggler: boolean) {
    this.store.dispatch(new ToggleThemesDialog(toggler));
  }

  private getPriorities() {
    this.store.dispatch(new GetPriorities());
  }

}
