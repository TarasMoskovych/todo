import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { settingsEffects, settingsReducers } from '../core/+store';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import {
  PrioritiesDialogComponent,
  PrioritiesTableComponent,
  SettingsDialogComponent,
  PriorityFormComponent,
} from './components';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsDialogComponent,
    PrioritiesDialogComponent,
    PrioritiesTableComponent,
    PriorityFormComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('settings', settingsReducers),
    EffectsModule.forFeature(settingsEffects),
    SharedModule,
    NgxMatColorPickerModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  exports: [
    SettingsComponent,
  ],
  entryComponents: [
    SettingsDialogComponent,
    PrioritiesDialogComponent,
    PriorityFormComponent,
  ]
})
export class SettingsModule { }
