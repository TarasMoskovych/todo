import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    LoaderComponent,
    OrderByPipe,
  ]
})
export class SharedModule { }
