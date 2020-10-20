import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Category, Priority, Task, TaskFilter } from '../models';
import { TaskFormComponent } from './components';
import {
  tasksFilteredSelector,
  tasksLoadingSelector,
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
  ToggleStatistic,
} from '../core/+store';
import { ConfirmDialogComponent } from '../shared/components';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  isMobile: boolean = this.deviceService.isMobile();
  categories$: Observable<CategoryEntity> = this.store.select(categoriesEntitiesSelector);
  loading$: Observable<boolean> = this.store.select(tasksLoadingSelector);
  priorityEntities$: Observable<PriorityEntity> = this.store.select(prioritiesEntitiesSelector);
  priorities$: Observable<Priority[]> = this.store.select(prioritiesSelector);
  tasks$: Observable<Task[]> = this.store.select(tasksFilteredSelector);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.toggleStatistic();
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
    this.store.dispatch(new GetTasks());
  }

  private toggleStatistic() {
    this.store.dispatch(new ToggleStatistic(!this.isMobile));
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
