import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from '../models';
import { tasksSelector, GetTasks } from '../core/+store/tasks';

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

  private getTasks() {
    this.tasks$ = this.store.select(tasksSelector);
    this.store.dispatch(new GetTasks());
  }

}
