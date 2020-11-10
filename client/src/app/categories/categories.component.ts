import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category, Color, Filter, TasksUncompletedCount } from '../models';
import {
  GetCategories,
  SelectCategory,
  CreateCategory,
  UpdateCategory,
  RemoveCategory,
  FilterCategories,
  categoriesFilteredSelector,
  categoriesFilterSelector,
  categoriesSelectedSelector,
  tasksUncompletedCountSelector,
  AppState,
  themesColorSelector,
  themesImageSelector,
  themesDarkThemeSelector,
} from '../core/+store';
import { FormDialogComponent } from '../shared/components';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  color$: Observable<Color> = this.store.select(themesColorSelector);
  darkTheme$: Observable<boolean> = this.store.select(themesDarkThemeSelector);
  image$: Observable<string> = this.store.select(themesImageSelector);
  categories$: Observable<Category[]> = this.store.select(categoriesFilteredSelector);
  selected$: Observable<Category> = this.store.select(categoriesSelectedSelector);
  filter$: Observable<Filter> = this.store.select(categoriesFilterSelector);
  tasksUncompletedCount$: Observable<TasksUncompletedCount> = this.store.select(tasksUncompletedCountSelector);

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onCategoryAdd() {
    this.dialog.open(FormDialogComponent, {
      width: '50%',
      data: { title: 'Add category' },
    }).afterClosed()
      .pipe(take(1))
      .subscribe(({ name } = {}) => name && this.createCategory({ id: null, name }));
  }

  onCategoryEdit(category: Category) {
    this.dialog.open(FormDialogComponent, {
      width: '50%',
      data: {
        name: category.name,
        title: 'Edit category',
      },
    }).afterClosed()
      .pipe(take(1))
      .subscribe(({ name, remove } = {}) => name && this[remove ? 'removeCategory' : 'updateCategory']({ ...category, name }));
  }

  onSetFilter(filter: Filter) {
    this.store.dispatch(new FilterCategories(filter));
  }

  onSortByCategory(category: Category) {
    this.store.dispatch(new SelectCategory(category));
  }

  private getCategories() {
    this.store.dispatch(new GetCategories());
  }

  private createCategory(category: Category) {
    this.store.dispatch(new CreateCategory(category));
  }

  private updateCategory(category: Category) {
    this.store.dispatch(new UpdateCategory(category));
  }

  private removeCategory(category: Category) {
    this.store.dispatch(new RemoveCategory(category));
  }

}
