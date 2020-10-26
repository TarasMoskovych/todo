import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NotificationService } from './notification.service';
import { Priority } from 'src/app/models';
import { CoreModule } from '../core.module';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: CoreModule
})
export class PrioritiesService extends AbstractService<Priority> {

  constructor(http: HttpClient, notificationService: NotificationService) {
    super(http, '/api/priorities', notificationService);
  }

  create(priority: Priority): Observable<Priority> {
    return super.create({ ...priority, name: priority.name.toLowerCase() });
  }
}
