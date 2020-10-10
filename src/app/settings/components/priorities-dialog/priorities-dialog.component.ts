import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AppState, prioritiesSelector, UpdatePriority, RemovePriority, CreatePriority } from 'src/app/core/+store';
import { Priority } from 'src/app/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { PriorityFormComponent } from '../priority-form/priority-form.component';

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

  onPriorityAdd() {
    this.openFormDialog(false);
  }

  onPriorityEdit(priority: Priority) {
    this.openFormDialog(true, priority);
  }

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

  private openFormDialog(edit: boolean, priority?: Priority) {
    this.dialog.open(PriorityFormComponent, {
      data: priority,
      width: '40%',
    }).afterClosed()
      .pipe(take(1))
      .subscribe((payload: Priority) => {
        if (payload) {
          this.store.dispatch(edit ? new UpdatePriority(payload) : new CreatePriority(payload));
        }
      });
  }
}
