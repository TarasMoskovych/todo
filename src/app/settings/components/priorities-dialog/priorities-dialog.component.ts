import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState, prioritiesSelector, RemovePriority } from 'src/app/core/+store';
import { Priority } from 'src/app/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-priorities-dialog',
  templateUrl: './priorities-dialog.component.html',
  styleUrls: ['./priorities-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrioritiesDialogComponent {
  priorities$: Observable<Priority[]> = this.store.select(prioritiesSelector);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) { }

  onPriorityRemove(priority: Priority) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to remove "${priority.name}" priority?`
      },
      width: '40%',
    }).afterClosed()
      .pipe(take(1))
      .subscribe((remove: boolean) => remove && this.store.dispatch(new RemovePriority(priority)));
  }

}
