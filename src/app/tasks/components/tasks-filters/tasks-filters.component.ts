import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Priority, TaskFilter } from 'src/app/models';
import { Constants, Debounce } from 'src/app/shared';

@Component({
  selector: 'app-tasks-filters',
  templateUrl: './tasks-filters.component.html',
  styleUrls: ['./tasks-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFiltersComponent implements OnInit {
  @Input() priorities: Priority[];
  @Output() setFilter = new EventEmitter<TaskFilter>();

  filtersForm: FormGroup;
  noPriority = Constants.WITHOUT_PRIORITY;

  ngOnInit(): void {
    this.buildForm();
  }

  @Debounce(300)
  onKeyup() {
    this.submit();
  }

  onReset() {
    this.filtersForm.reset();
    this.submit();
  }

  submit() {
    this.setFilter.emit(this.filtersForm.value);
  }

  private buildForm() {
    this.filtersForm = new FormGroup({
      query: new FormControl(),
      status: new FormControl(),
      priority: new FormControl(),
    });
  }

}
