import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Category } from '../../models';

@Injectable({
  providedIn: CoreModule
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`/api/categories`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
