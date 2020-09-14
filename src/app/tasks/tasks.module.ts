import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TasksComponent } from './tasks.component';
import { TasksEffects, tasksReducer } from '../core/+store/tasks'

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
  exports: [
    TasksComponent,
  ]
})
export class TasksModule { }
