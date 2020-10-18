import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Priority } from 'src/app/models';
import { CoreModule } from '../core.module';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: CoreModule
})
export class PrioritiesService extends AbstractService<Priority> {

  constructor(http: HttpClient) {
    super(http, '/api/priorities');
  }
}
