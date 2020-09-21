import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from 'src/app/models';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskEditComponent>,
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
    const { name, completed } = this.task;

    this.taskForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.pattern(new RegExp(['^([a-z0-9]+\\s)*', '[a-z0-9]+$'].join(''),'i')),
      ]),
      completed: new FormControl(completed),
    });
  }

}
