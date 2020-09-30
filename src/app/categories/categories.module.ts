import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CategoriesComponent } from './categories.component';
import { CategoriesEffects, categoriesReducer } from '../core/+store';

import { SharedModule } from '../shared/shared.module';
import { CategoriesListComponent } from './components';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('categories', categoriesReducer),
    EffectsModule.forFeature([CategoriesEffects]),
    SharedModule,
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
