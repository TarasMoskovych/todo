import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderByPipe } from './pipes';

@NgModule({
  declarations: [
    OrderByPipe
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
