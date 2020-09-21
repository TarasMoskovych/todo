import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './components';
import { OrderByPipe } from './pipes';

@NgModule({
  declarations: [
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
    LoaderComponent,
    OrderByPipe,
  ]
})
export class SharedModule { }
