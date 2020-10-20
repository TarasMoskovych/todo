import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface IPayload {
  id: string;
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

  create(payload: T): Observable<T> {
    return this.http
      .post<T>(`${this.url}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  update<T extends IPayload>(payload: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  remove<T extends IPayload>(payload: T): Observable<T> {
    return this.http
      .delete<T>(`${this.url}/${payload.id}`)
      .pipe(
        map(() => payload),
        catchError((error: any) => throwError(error))
      );
  }
}
