import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Category } from '../models';
import {
  GetCategories,
  SelectCategory,
  UpdateCategory,
  RemoveCategory,
  categoriesSelector,
  categoriesSelectedSelector,
  AppState,
} from '../core/+store';
import { FormDialogComponent } from '../shared';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  selected$: Observable<Category>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSelected();
  }

  onCategoryEdit(category: Category) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '50%',
      data: {
        name: category.name,
        title: 'Edit category',
      },
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(({ name, remove } = {}) => name && this[remove ? 'removeCategory' : 'updateCategory']({ ...category, name }));
  }

  onSortByCategory(category: Category) {
    this.store.dispatch(new SelectCategory(category));
  }

  private getCategories() {
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.store.dispatch(new GetCategories());
  }

  private getSelected() {
    this.selected$ = this.store.pipe(select(categoriesSelectedSelector));
  }

  private updateCategory(category: Category) {
    this.store.dispatch(new UpdateCategory(category));
  }

  private removeCategory(category: Category) {
    this.store.dispatch(new RemoveCategory(category));
  }

}
