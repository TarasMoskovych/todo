import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AppState, prioritiesEntitiesSelector, PriorityEntity, tasksPrioritiesCountSelector } from 'src/app/core/+store';
import { AbstractTasksStatisticChartComponent } from './../abstract.tasks-statistic-chart.component';

@Component({
  selector: 'app-tasks-statistic-priorities-chart',
  templateUrl: './tasks-statistic-priorities-chart.component.html',
  styleUrls: ['./tasks-statistic-priorities-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksStatisticPrioritiesChartComponent extends AbstractTasksStatisticChartComponent {
  priorities$: Observable<PriorityEntity> = this.store.select(prioritiesEntitiesSelector);
  tasksPrioritiesCount$: Observable<Object>;

  constructor(
    private store: Store<AppState>,
    titleCasePipe: TitleCasePipe,
  ) {
    super(titleCasePipe);
  }

  protected draw() {
    super.draw('#FFECD2');

    this.tasksPrioritiesCount$ = this.store.select(tasksPrioritiesCountSelector).pipe(
      switchMap((tasksPrioritiesCount: { [key: string]: number }) => {
        return this.priorities$.pipe(
          tap((priorities: PriorityEntity) => {
            this.chartLabels = [];
            this.chartData = [];

            Object.keys(tasksPrioritiesCount).forEach((key: string) => {
              if (tasksPrioritiesCount[key] && (priorities[key] || key === '0')) {
                this.chartLabels.push(this.transformToTitleCase(priorities[key]?.name || 'no priority'));
                (this.chartData as number[]).push(tasksPrioritiesCount[key]);
              }
            });
          })
        )
      })
    );
  }
}
