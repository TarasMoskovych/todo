import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category, Task, TaskFilter } from '../models';
import { TaskFormComponent } from './components';
import {
  tasksFilteredSelector,
  tasksLoadedSelector,
  categoriesEntitiesSelector,
  AppState,
  CategoryEntity,
  GetTasks,
  CreateTask,
  UpdateTask,
  RemoveTask,
  FilterTasks,
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

  onTaskAdd() {
    this.dialog.open(TaskFormComponent, { width: '50%' })
      .afterClosed()
      .pipe(take(1))
      .subscribe(({ task } = {}) => task && this.createTask(task));
  }

  onTaskEdit({ task, openModal }: { task: Task, openModal: boolean }) {
    if (openModal) {
      this.dialog.open(TaskFormComponent, { data: task, width: '50%' })
        .afterClosed()
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
    this.store.dispatch(new FilterTasks(filter));
  }

  private getTasks() {
    this.loaded$ = this.store.select(tasksLoadedSelector);
    this.tasks$ = this.store.select(tasksFilteredSelector);
    this.store.dispatch(new GetTasks());
  }

  private createTask(task: Task) {
    this.store.dispatch(new CreateTask(task));
  }

  private updateTask(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }

  private removeTask(task: Task) {
    this.store.dispatch(new RemoveTask(task));
  }

}
