import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category, Task, TaskFilter } from '../models';
import { TaskEditComponent } from './components';
import {
  tasksSelector,
  tasksLoadedSelector,
  categoriesEntitiesSelector,
  AppState,
  CategoryEntity,
  GetTasks,
  UpdateTask,
  RemoveTask,
  FilterTask,
  SelectCategory,
  PriorityEntity,
  prioritiesEntitiesSelector,
  prioritiesSelector,
} from '../core/+store';
import { ConfirmDialogComponent } from '../shared';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  categories$: Observable<CategoryEntity> = this.store.select(categoriesEntitiesSelector);
  loaded$: Observable<boolean>;
  priorityEntities$: Observable<PriorityEntity> = this.store.select(prioritiesEntitiesSelector);
  priorities$: Observable<PriorityEntity> = this.store.select(prioritiesSelector);
  tasks$: Observable<Task[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  onTaskEdit({ task, openModal }: { task: Task, openModal: boolean }) {
    let dialogRef: MatDialogRef<TaskEditComponent>;

    if (openModal) {
      dialogRef = this.dialog.open(TaskEditComponent, { data: task, width: '50%' });
      dialogRef.afterClosed()
        .pipe(take(1))
        .subscribe(({ task, remove } = {}) => task && this[remove ? 'removeTask' : 'updateTask'](task));
    } else {
      this.updateTask(task);
    }
  }

  onTaskRemove(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to remove "${task.name}" task?`
      },
      width: '40%',
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((remove: boolean) => remove && this.removeTask(task));
  }

  onCategorySelect(category: Category) {
    this.store.dispatch(new SelectCategory(category));
  }

  onSetFilter(filter: TaskFilter) {
    this.store.dispatch(new FilterTask(filter));
  }

  private getTasks() {
    this.loaded$ = this.store.select(tasksLoadedSelector);
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(new GetTasks());
  }

  private updateTask(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }

  private removeTask(task: Task) {
    this.store.dispatch(new RemoveTask(task));
  }

}
