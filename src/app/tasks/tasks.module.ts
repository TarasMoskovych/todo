import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { TasksEffects, tasksReducer } from '../core/+store/tasks'
import { TasksComponent } from './tasks.component';
import { TaskEditComponent, TasksTableComponent } from './components';

@NgModule({
  declarations: [
    TasksComponent,
    TaskEditComponent,
    TasksTableComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
    SharedModule,
  ],
  entryComponents: [
    TaskEditComponent,
  ],
  exports: [
    TasksComponent,
  ]
})
export class TasksModule { }
