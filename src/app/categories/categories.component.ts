import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Category } from '../models';

import { categoriesSelector, GetCategories, SelectCategory, categoriesSelectedSelector } from '../core/+store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  selected$: Observable<Category>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSelected();
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

}
