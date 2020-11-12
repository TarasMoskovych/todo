import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStatisticPrioritiesChartComponent } from './tasks-statistic-priorities-chart.component';

describe('TasksStatisticPrioritiesChartComponent', () => {
  let component: TasksStatisticPrioritiesChartComponent;
  let fixture: ComponentFixture<TasksStatisticPrioritiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticPrioritiesChartComponent ]
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
