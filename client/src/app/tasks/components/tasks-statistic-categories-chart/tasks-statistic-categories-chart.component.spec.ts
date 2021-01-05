import { TitleCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { categoriesSelector, registerStore, tasksUncompletedCountSelector } from 'src/app/core/+store';
import { TestData, TasksUncompletedCount } from 'src/app/models';
import { TasksStatisticCategoriesChartComponent } from './tasks-statistic-categories-chart.component';

const { categories } = TestData.data;
const tasksUncompletedCount1: TasksUncompletedCount = {
  count: 3,
  entities: { 1: 1, 2: 1, 3: 1 },
};
const tasksUncompletedCount2: TasksUncompletedCount = {
  count: 4,
  entities: { 0: 1, 1: 1, 2: 1, 3: 1 },
};

describe('TasksStatisticCategoriesChartComponent', () => {
  let component: TasksStatisticCategoriesChartComponent;
  let fixture: ComponentFixture<TasksStatisticCategoriesChartComponent>;
  const storeSpy = jasmine.createSpyObj('Store', ['select']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksStatisticCategoriesChartComponent],
      imports: [
        ...registerStore(),
      ],
      providers: [
        TitleCasePipe,
        { provide: Store, useValue: storeSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  const createComponent = () => {
    TestBed.overrideProvider(Store, { useValue: storeSpy });
    fixture = TestBed.createComponent(TasksStatisticCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should draw chart without 0 entity', () => {
    storeSpy.select
      .withArgs(categoriesSelector).and.returnValue(of(categories))
      .withArgs(tasksUncompletedCountSelector).and.returnValue(of(tasksUncompletedCount1));

    createComponent();
    expect(component.chartLabels).toEqual(['Education', 'Family', 'Work']);
    expect(component.chartData).toEqual([1, 1, 1]);
  });

  it('should draw chart with 0 entity', () => {
    storeSpy.select
      .withArgs(categoriesSelector).and.returnValue(of(categories))
      .withArgs(tasksUncompletedCountSelector).and.returnValue(of(tasksUncompletedCount2));

    createComponent();
    expect(component.chartLabels).toEqual(['No Category', 'Education', 'Family', 'Work']);
    expect(component.chartData).toEqual([1, 1, 1, 1]);
  });

  afterEach(() => {
    expect(component).toBeTruthy();
    expect(component.chartColors).toEqual([{
      borderColor: '#fff',
      backgroundColor: 'transparent',
      pointBackgroundColor: '#fff',
    }]);
    expect(component.chartOptions.scales.xAxes[0].ticks.fontColor).toEqual('#CEE9D0');
    expect(component.chartOptions.scales.yAxes[0].ticks.fontColor).toEqual('#CEE9D0');
  });
});
