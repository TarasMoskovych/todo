import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStatisticCategoriesChartComponent } from './tasks-statistic-categories-chart.component';

describe('TasksStatisticCategoriesChartComponent', () => {
  let component: TasksStatisticCategoriesChartComponent;
  let fixture: ComponentFixture<TasksStatisticCategoriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticCategoriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksStatisticCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
