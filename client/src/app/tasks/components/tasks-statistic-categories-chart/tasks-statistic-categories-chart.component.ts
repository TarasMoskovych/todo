import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AppState, tasksUncompletedCountSelector, categoriesSelector } from 'src/app/core/+store';
import { Category, TasksUncompletedCount } from 'src/app/models';
import { AbstractTasksStatisticChartComponent } from './../abstract.tasks-statistic-chart.component';

@Component({
  selector: 'app-tasks-statistic-categories-chart',
  templateUrl: './tasks-statistic-categories-chart.component.html',
  styleUrls: ['./tasks-statistic-categories-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksStatisticCategoriesChartComponent extends AbstractTasksStatisticChartComponent {
  categories$: Observable<Category[]> = this.store.select(categoriesSelector);
  tasksUncompletedCount$: Observable<Object>;

  constructor(
    private store: Store<AppState>,
    titleCasePipe: TitleCasePipe,
  ) {
    super(titleCasePipe);
  }

  protected draw() {
    super.draw('#CEE9D0', {
      backgroundColor: {
        default: 'transparent',
        dark: 'transparent',
      },
    });

    this.tasksUncompletedCount$ = this.store.select(tasksUncompletedCountSelector).pipe(
      switchMap(({ entities }: TasksUncompletedCount) => {
        return this.categories$.pipe(
          tap((categories: Category[]) => {
            this.chartLabels = [];
            this.chartData = [];

            if (entities['0']) {
              this.chartLabels.push('No Category');
              (this.chartData as number[]).push(entities['0']);
            }

            categories
              .sort((a: Category, b: Category) => a.name.localeCompare(b.name))
              .forEach((category: Category) => {
                if (entities[category.id]) {
                  this.chartLabels.push(this.transformToTitleCase(category.name));
                  (this.chartData as number[]).push(entities[category.id]);
                }
              });
          })
        )
      })
    );
  }
}
