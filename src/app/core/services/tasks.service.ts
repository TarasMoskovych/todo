import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreModule } from '../core.module';
import { Task } from 'src/app/models';
import { AbstractService } from './abstract.service'

@Injectable({
  providedIn: CoreModule
})
export class TasksService extends AbstractService<Task> {

  constructor(http: HttpClient) {
    super(http, '/api/tasks');
  }
}
