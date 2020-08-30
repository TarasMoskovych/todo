import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Category } from '../models';

import { categoriesSelector, GetCategories } from '../core/+store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.store.dispatch(new GetCategories());
  }

}
