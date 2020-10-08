import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState, categoriesSelectedSelector, categoriesSelector, prioritiesSelector } from 'src/app/core/+store';

import { Category, Priority, Task } from 'src/app/models';
import { Constants } from 'src/app/shared/classes';
import { ConfirmDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {
  categories$: Observable<Category[]> = this.store.select(categoriesSelector);
  priorities$: Observable<Priority[]> = this.store.select(prioritiesSelector);
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getSelectedCategory();
  }

  onChange() {
    const { completed } = this.taskForm.value;
    this.taskForm.patchValue({ completed: !completed });
  }

  onRemove() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Do you want to remove "${this.task.name}" task?`
      },
      width: '40%',
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((remove: boolean) => remove && this.closeEditDialog(this.task, remove));
  }

  onSubmit() {
    this.closeEditDialog({ ...this.task, ...this.taskForm.value });
  }

  private buildForm() {
    const { name, completed, category, priorityId, date } = this.task || {};

    this.taskForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.pattern(Constants.VALIDATION_PATTERN),
      ]),
      completed: new FormControl(!!completed),
      category: new FormControl(category),
      priorityId: new FormControl(priorityId),
      date: new FormControl(date),
    });
  }

  private closeEditDialog(task: Task, remove = false) {
    this.dialogRef.close({ task, remove });
  }

  private getSelectedCategory() {
    if (this.task) { return; }

    this.store.select(categoriesSelectedSelector)
      .pipe(take(1))
      .subscribe((category: Category) => this.taskForm.patchValue({ category: category?.id }));
  }

}
