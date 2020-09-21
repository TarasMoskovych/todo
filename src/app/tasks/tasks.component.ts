import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Task } from '../models';
import { tasksSelector, GetTasks, UpdateTask, tasksLoadedSelector } from '../core/+store/tasks';
import { TaskEditComponent } from './components';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  loaded$: Observable<boolean>;
  tasks$: Observable<Task[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<Task>,
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
        .subscribe((task: Task) => this.updateTask(task));
    } else {
      this.updateTask(task);
    }
  }

  private getTasks() {
    this.loaded$ = this.store.select(tasksLoadedSelector);
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(new GetTasks());
  }

  private updateTask(task: Task) {
    task && this.store.dispatch(new UpdateTask(task));
  }

}
