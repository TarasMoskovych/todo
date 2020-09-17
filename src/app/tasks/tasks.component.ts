import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../models';
import { tasksSelector, GetTasks, UpdateTask, tasksLoadedSelector } from '../core/+store/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  loaded$: Observable<boolean>;
  tasks$: Observable<Task[]>;

  constructor(private store: Store<Task>) { }

  ngOnInit(): void {
    this.getTasks();
  }

  onTaskCheck(task: Task) {
    this.store.dispatch(new UpdateTask(task));
  }

  private getTasks() {
    this.loaded$ = this.store.select(tasksLoadedSelector);
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(new GetTasks());
  }

}
