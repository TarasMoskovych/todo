import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Priority, TaskFilter } from 'src/app/models';
import { FilterComponent } from 'src/app/shared/components';
import { Constants } from 'src/app/shared/classes';

@Component({
  selector: 'app-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFiltersComponent extends FilterComponent {
  @Input() priorities: Priority[];
  @Output() setFilter = new EventEmitter<TaskFilter>();
  @ViewChild(FilterComponent) filter: FilterComponent;

  protected controls = [...this.controls, 'status', 'priority'];
  noPriority = Constants.WITHOUT_PRIORITY;

  onSetQuery(control: FormControl) {
    this.filtersForm.patchValue(control);
    this.submit();
  }

  onReset() {
    this.filter.filtersForm.reset();
    this.filtersForm.reset();
    this.submit();
  }

  submit() {
    this.setFilter.emit(this.filtersForm.value);
  }
}
