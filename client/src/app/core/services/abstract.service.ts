import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';

interface IPayload {
  id: string;
}

export abstract class AbstractService<T> {

  constructor(
    protected http: HttpClient,
    protected url: string,
    private notificationService: NotificationService,
  ) { }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.url)
      .pipe(catchError((error: HttpErrorResponse) => this.catchError(error)));
  }

  create(payload: T): Observable<T> {
    return this.http
      .post<T>(`${this.url}`, payload)
      .pipe(catchError((error: HttpErrorResponse) => this.catchError(error)));
  }

  update<T extends IPayload>(payload: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${payload.id}`, payload)
      .pipe(catchError((error: HttpErrorResponse) => this.catchError(error)));
  }

  remove<T extends IPayload>(payload: T): Observable<T> {
    return this.http
      .delete<T>(`${this.url}/${payload.id}`)
      .pipe(
        map(() => payload),
        catchError((error: HttpErrorResponse) => this.catchError(error))
      );
  }

  private catchError({ error }: HttpErrorResponse): Observable<never> {
    this.notificationService.showMessage(error?.message || 'Error during request');
    return throwError(error);
  }
}
