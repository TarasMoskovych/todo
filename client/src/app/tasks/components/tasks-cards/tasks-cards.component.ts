import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AbstractTasksListComponent } from './../abstract.tasks-list.component';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-tasks-cards',
  templateUrl: './tasks-cards.component.html',
  styleUrls: ['./tasks-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCardsComponent extends AbstractTasksListComponent {

  onTaskStatusEdit(e: MouseEvent, task: Task) {
    e.stopPropagation();
    this.dispatchEdit({ ...task, completed: !task.completed });
  }

}
