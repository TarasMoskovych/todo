import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/+store';
import { GetPriorities } from '../core/+store/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getPriorities();
  }

  private getPriorities() {
    this.store.dispatch(new GetPriorities());
  }

}
