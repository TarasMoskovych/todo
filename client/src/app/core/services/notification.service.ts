import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class NotificationService {

  constructor(protected snackBar: MatSnackBar) { }

  showMessage(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 2000,
    });
  }
}
