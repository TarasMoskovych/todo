import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CategoryEntity } from 'src/app/core/+store';
import { Category, Priority, Task } from 'src/app/models';

@Component({ template: '' })
export abstract class AbstractTasksListComponent {
  @Input() tasks: Task[];
  @Input() categories: CategoryEntity = {};
  @Input() priorities: Priority[];
  @Output() taskEdit = new EventEmitter<{ task: Task, openModal: boolean }>();
  @Output() categorySelect = new EventEmitter<Category>();

  onTaskEdit(task: Task) {
    this.dispatchEdit(task, true);
  }

  onCategorySelect(category: Category, event?: MouseEvent) {
    event?.stopPropagation();
    category && this.categorySelect.emit(category);
  }

  protected dispatchEdit(task: Task, openModal = false) {
    this.taskEdit.emit({ task, openModal });
  }
}
