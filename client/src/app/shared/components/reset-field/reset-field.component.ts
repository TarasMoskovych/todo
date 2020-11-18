import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reset-field',
  templateUrl: './reset-field.component.html',
  styleUrls: ['./reset-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetFieldComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() control: string;
  @Output() reset = new EventEmitter<void>();

  value$: Observable<string>;

  ngOnInit(): void {
    this.getControlValue();
  }

  onReset(e: MouseEvent) {
    e.stopPropagation();
    this.form.patchValue({ [this.control]: null });
    this.reset.emit();
  }

  private getControlValue() {
    if (this.form) {
      this.value$ = this.form.valueChanges.pipe(
        map((form: FormGroup) => form[this.control])
      );
    }
  }

}
