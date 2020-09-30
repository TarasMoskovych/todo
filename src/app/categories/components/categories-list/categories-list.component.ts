import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Category } from 'src/app/models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {
  @Input() categories: Category[];
  @Input() selected: Category;
  @Output() sortByCategory = new EventEmitter<Category>();
  @Output() categoryEdit = new EventEmitter<Category>();

  onSortByCategory(category: Category) {
    this.sortByCategory.emit(category);
  }

  onCategoryEdit(e: MouseEvent, category: Category) {
    e.stopPropagation();
    this.categoryEdit.emit(category);
  }

}
