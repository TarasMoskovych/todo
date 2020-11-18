import { TitleCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { registerStore } from 'src/app/core/+store';
import { TasksStatisticPrioritiesChartComponent } from './tasks-statistic-priorities-chart.component';

describe('TasksStatisticPrioritiesChartComponent', () => {
  let component: TasksStatisticPrioritiesChartComponent;
  let fixture: ComponentFixture<TasksStatisticPrioritiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticPrioritiesChartComponent ],
      imports: [
        ...registerStore(),
      ],
      providers: [TitleCasePipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksStatisticPrioritiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
