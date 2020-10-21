import { Component, OnInit, ChangeDetectionStrategy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMatColorPickerInput, Color } from '@angular-material-components/color-picker';

import { Priority } from 'src/app/models';
import { Constants, hexToRgb } from 'src/app/shared/classes';

@Component({
  selector: 'app-priority-form',
  templateUrl: './priority-form.component.html',
  styleUrls: ['./priority-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriorityFormComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput;

  priorityForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public priority: Priority,
    private dialogRef: MatDialogRef<PriorityFormComponent>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    const result = hexToRgb(this.priority?.color);

    if (!result) { return; }
    this.pickerInput.value = new Color(result.r, result.g, result.b);
  }

  onSubmit() {
    const { color } = this.priorityForm.value;
    this.dialogRef.close({ ...this.priority, ...this.priorityForm.value, color: color instanceof Color ? `#${color.hex}` : color });
  }

  private buildForm() {
    const { name, color } = this.priority || {};

    this.priorityForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.pattern(Constants.VALIDATION_PATTERN),
      ]),
      color: new FormControl(color, [
        Validators.required,
      ]),
    });
  }
}
