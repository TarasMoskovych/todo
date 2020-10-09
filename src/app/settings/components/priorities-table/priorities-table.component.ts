import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Priority } from 'src/app/models';

@Component({
  selector: 'app-priorities-table',
  templateUrl: './priorities-table.component.html',
  styleUrls: ['./priorities-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrioritiesTableComponent {
  @Input() priorities: Priority[];
  @Output() priorityRemove = new EventEmitter<Priority>();

  onPriorityRemove(priority: Priority) {
    this.priorityRemove.emit(priority);
  }
}
