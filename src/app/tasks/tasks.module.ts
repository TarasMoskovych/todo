import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { TasksEffects, tasksReducer } from '../core/+store/tasks'
import { TasksComponent } from './tasks.component';
import { TasksTableComponent } from './components';

@NgModule({
  declarations: [
    TasksComponent,
    TasksTableComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
    SharedModule,
  ],
  exports: [
    TasksComponent,
  ]
})
export class TasksModule { }
