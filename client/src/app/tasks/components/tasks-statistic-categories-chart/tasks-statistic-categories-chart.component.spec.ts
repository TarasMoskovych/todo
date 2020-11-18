import { TitleCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { registerStore } from 'src/app/core/+store';
import { TasksStatisticCategoriesChartComponent } from './tasks-statistic-categories-chart.component';

describe('TasksStatisticCategoriesChartComponent', () => {
  let component: TasksStatisticCategoriesChartComponent;
  let fixture: ComponentFixture<TasksStatisticCategoriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticCategoriesChartComponent ],
      imports: [
        ...registerStore(),
      ],
      providers: [TitleCasePipe],
      schemas: [NO_ERRORS_SCHEMA],
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
