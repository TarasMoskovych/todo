import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    CategoriesModule,
    TasksModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
