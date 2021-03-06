import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, tasksStatisticsSelector, tasksShowStatisticSelector, themesDarkThemeSelector } from 'src/app/core/+store';
import { Statistic, StatisticData, TasksStatistics } from 'src/app/models';
import { toggleAnimation } from 'src/app/shared/animations';
import { Constants } from 'src/app/shared/classes';

@Component({
  selector: 'app-tasks-statistic',
  templateUrl: './tasks-statistic.component.html',
  styleUrls: ['./tasks-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toggleAnimation]
})
export class TasksStatisticComponent implements OnInit, AfterViewInit {
  viewInit = false;
  darkTheme$: Observable<boolean> = this.store.select(themesDarkThemeSelector);
  statistics$: Observable<Statistic[]>;
  showStatistic$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  ngAfterViewInit() {
    this.viewInit = true;
  }

  private getStatistics() {
    this.showStatistic$ = this.store.select(tasksShowStatisticSelector);
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
