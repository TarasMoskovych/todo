import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
