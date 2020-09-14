import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { OrderByPipe } from './pipes';

@NgModule({
  declarations: [
    OrderByPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    OrderByPipe,
  ]
})
export class SharedModule { }
