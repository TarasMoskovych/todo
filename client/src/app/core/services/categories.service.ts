import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { Category } from 'src/app/models';
import { AbstractService } from './abstract.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: CoreModule
})
export class CategoriesService extends AbstractService<Category> {

  constructor(http: HttpClient, notificationService: NotificationService) {
    super(http, '/api/categories', notificationService);
  }

  create(category: Category): Observable<Category> {
    return super.create({ ...category, name: category.name.toLowerCase() });
  }
}
