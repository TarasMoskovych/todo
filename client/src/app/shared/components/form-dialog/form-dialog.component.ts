import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { Constants } from '../../classes';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, title: string },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<FormDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    this.closeEditDialog(this.form.value.name);
  }

  onRemove() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to remove "${this.data.name}"?`
      },
      width: '40%',
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((remove: boolean) => remove && this.closeEditDialog(this.data.name, remove));
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.pattern(Constants.VALIDATION_PATTERN),
      ]),
    });
  }

  private closeEditDialog(name: string, remove = false) {
    this.dialogRef.close({ name, remove });
  }

}
