import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Task } from 'src/app/models';

@Injectable({
  providedIn: CoreModule
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`/api/tasks`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
