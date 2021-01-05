import { TitleCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { prioritiesEntitiesSelector, registerStore, tasksPrioritiesCountSelector } from 'src/app/core/+store';
import { TestData } from 'src/app/models';
import { TasksStatisticPrioritiesChartComponent } from './tasks-statistic-priorities-chart.component';

const { prioritiesEntities } = TestData.data;

describe('TasksStatisticPrioritiesChartComponent', () => {
  let component: TasksStatisticPrioritiesChartComponent;
  let fixture: ComponentFixture<TasksStatisticPrioritiesChartComponent>;
  const storeSpy = jasmine.createSpyObj('Store', ['select']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticPrioritiesChartComponent ],
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
    fixture = TestBed.createComponent(TasksStatisticPrioritiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should draw chart', () => {
    storeSpy.select
      .withArgs(prioritiesEntitiesSelector).and.returnValue(of(prioritiesEntities))
      .withArgs(tasksPrioritiesCountSelector).and.returnValue(of({ 0: 1, 1: 1, 2: 1, 3: 2 }));

    createComponent();
    expect(component.chartLabels).toEqual(['No Priority', 'Low', 'Medium', 'High']);
    expect(component.chartData).toEqual([1, 1, 1, 2]);
  });

  it('should draw empty chart', () => {
    storeSpy.select
      .withArgs(prioritiesEntitiesSelector).and.returnValue(of({}))
      .withArgs(tasksPrioritiesCountSelector).and.returnValue(of({ 1: 1, 2: 1, 3: 2 }));

    createComponent();
    expect(component.chartLabels).toEqual([]);
    expect(component.chartData).toEqual([]);
  });

  afterEach(() => {
    expect(component).toBeTruthy();
    expect(component.chartColors).toEqual([{
      borderColor: '#fff',
      backgroundColor: '#fff',
      pointBackgroundColor: '#fff',
    }]);
    expect(component.chartOptions.scales.xAxes[0].ticks.fontColor).toEqual('#FFECD2');
    expect(component.chartOptions.scales.yAxes[0].ticks.fontColor).toEqual('#FFECD2');
  });
});
