import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent, LoaderComponent, FormDialogComponent } from './components';
import { OrderByPipe, SmartDatePipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    FormDialogComponent,
    LoaderComponent,
    OrderByPipe,
    SmartDatePipe,
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
    FormDialogComponent,
    LoaderComponent,
    OrderByPipe,
    SmartDatePipe,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    FormDialogComponent,
  ]
})
export class SharedModule { }
