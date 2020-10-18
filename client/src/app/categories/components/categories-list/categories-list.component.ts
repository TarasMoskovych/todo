import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Category, Filter, TasksUncompletedCount } from 'src/app/models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {
  @Input() categories: Category[];
  @Input() filter: Filter;
  @Input() selected: Category;
  @Input() tasksUncompletedCount: TasksUncompletedCount;
  @Output() sortByCategory = new EventEmitter<Category>();
  @Output() categoryAdd = new EventEmitter<void>();
  @Output() categoryEdit = new EventEmitter<Category>();

  onSortByCategory(category: Category) {
    this.sortByCategory.emit(category);
  }

  onCategoryAdd(e: MouseEvent) {
    e.stopPropagation();
    this.categoryAdd.emit();
  }

  onCategoryEdit(e: MouseEvent, category: Category) {
    e.stopPropagation();
    this.categoryEdit.emit(category);
  }

}
