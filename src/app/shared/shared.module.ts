import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import {
  ConfirmDialogComponent,
  LoaderComponent,
  FormDialogComponent,
  ResetFieldComponent,
  FilterComponent,
  FooterComponent,
  HeaderComponent,
} from './components';
import { OrderByPipe, SmartDatePipe } from './pipes';
import { ClickOutsideDirective } from './directives';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    FormDialogComponent,
    LoaderComponent,
    ResetFieldComponent,
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    OrderByPipe,
    SmartDatePipe,
    ClickOutsideDirective,
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
    ResetFieldComponent,
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    OrderByPipe,
    SmartDatePipe,
    ClickOutsideDirective,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    FormDialogComponent,
  ]
})
export class SharedModule { }
