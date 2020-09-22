import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, categoriesSelector } from 'src/app/core/+store';

import { Category, Task } from 'src/app/models';
import { Constants } from 'src/app/shared';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnInit {
  categories$: Observable<Category[]> = this.store.select(categoriesSelector);
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskEditComponent>,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onChange() {
    const { completed } = this.taskForm.value;
    this.taskForm.patchValue({ completed: !completed });
  }

  onSubmit() {
    this.dialogRef.close({ ...this.task, ...this.taskForm.value });
  }

  private buildForm() {
    const { name, completed, categoryId } = this.task;

    this.taskForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.pattern(Constants.VALIDATION_PATTERN),
      ]),
      completed: new FormControl(completed),
      categoryId: new FormControl(categoryId),
    });
  }

}
