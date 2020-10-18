import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { Filter } from 'src/app/models';
import { Debounce } from '../../decorators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  @Input() labelText = 'Search';
  @Input() wrapperClass = 'col-12';
  @Output() setFilter = new EventEmitter<Filter>();

  protected controls = ['query'];
  filtersForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  @Debounce(300)
  onKeyup() {
    this.submit();
  }

  submit() {
    this.setFilter.emit(this.filtersForm.value);
  }

  private buildForm() {
    this.filtersForm = new FormGroup(
      this.controls.reduce((acc: { [key: string]: AbstractControl }, control: string) => {
        return { ...acc, [control]: new FormControl() };
      }, {})
    );
  }
}
