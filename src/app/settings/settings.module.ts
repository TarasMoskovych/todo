import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { settingsEffects, settingsReducers } from '../core/+store';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import {
  PrioritiesDialogComponent,
  PrioritiesTableComponent,
  SettingsDialogComponent
} from './components';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsDialogComponent,
    PrioritiesDialogComponent,
    PrioritiesTableComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('settings', settingsReducers),
    EffectsModule.forFeature(settingsEffects),
    SharedModule,
  ],
  exports: [
    SettingsComponent,
  ]
})
export class SettingsModule { }
