import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { TasksEffects, tasksReducer } from '../core/+store'
import { TasksComponent } from './tasks.component';
import {
  TaskFormComponent,
  TasksTableComponent,
  TasksFiltersComponent,
  TasksStatisticComponent,
  TasksStatisticCardComponent,
  TasksCardsComponent,
  TasksStatisticCategoriesChartComponent,
  TasksStatisticPrioritiesChartComponent,
} from './components';
import { CUSTOM_DATE_FORMATS } from '../shared/classes';

@NgModule({
  declarations: [
    TasksComponent,
    TaskFormComponent,
    TasksTableComponent,
    TasksFiltersComponent,
    TasksStatisticComponent,
    TasksStatisticCardComponent,
    TasksCardsComponent,
    TasksStatisticCategoriesChartComponent,
    TasksStatisticPrioritiesChartComponent,
  ],
  providers: [
    TitleCasePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
    SharedModule,
    ChartsModule,
  ],
  entryComponents: [
    TaskFormComponent,
  ],
  exports: [
    TasksComponent,
  ]
})
export class TasksModule { }
