import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent, LoaderComponent } from './components';
import { OrderByPipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    LoaderComponent,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    LoaderComponent,
    OrderByPipe,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule { }
