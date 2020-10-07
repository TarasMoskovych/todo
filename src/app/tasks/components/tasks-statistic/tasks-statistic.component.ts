import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, tasksStatisticsSelector } from 'src/app/core/+store';
import { Statistic, StatisticData, TasksStatistics } from 'src/app/models';
import { Constants } from 'src/app/shared';

@Component({
  selector: 'app-tasks-statistic',
  templateUrl: './tasks-statistic.component.html',
  styleUrls: ['./tasks-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksStatisticComponent implements OnInit {
  statistics$: Observable<Statistic[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  private getStatistics() {
    this.statistics$ = this.store.select(tasksStatisticsSelector)
      .pipe(
        map((tasksStatistics: TasksStatistics) => Constants.STATISTICS_DATA.reduce((acc: Statistic[], statistic: StatisticData) => {
          const value = tasksStatistics[statistic.key];
          acc.push({ ...statistic, value: statistic.percent ? value : `${value} of ${tasksStatistics.count}` });

          return acc;
        }, []))
      );
  }

}
