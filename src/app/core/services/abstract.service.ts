import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface IGeneric {
  id: number;
}

export abstract class AbstractService<T> {

  constructor(
    protected http: HttpClient,
    protected url: string,
  ) { }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update<T extends IGeneric>(body: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${body.id}`, body)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
