import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { registerStore } from 'src/app/core/+store';
import { TasksStatisticComponent } from './tasks-statistic.component';

describe('TasksStatisticComponent', () => {
  let component: TasksStatisticComponent;
  let fixture: ComponentFixture<TasksStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticComponent ],
      imports: [
        ...registerStore(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
