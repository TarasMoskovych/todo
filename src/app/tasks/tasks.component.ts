import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../models';
import { tasksSelector, GetTasks, UpdateTask } from '../core/+store/tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<Task>) { }

  ngOnInit(): void {
    this.getTasks();
  }

  onTaskCheck({ checked }: MatCheckboxChange, task: Task) {
    this.store.dispatch(new UpdateTask({ ...task, completed: checked }));
  }

  private getTasks() {
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(new GetTasks());
  }

}
