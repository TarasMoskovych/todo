import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Statistic } from 'src/app/models';

@Component({
  selector: 'app-tasks-statistic-card',
  templateUrl: './tasks-statistic-card.component.html',
  styleUrls: ['./tasks-statistic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksStatisticCardComponent {
  @Input() statistic: Statistic;
}
