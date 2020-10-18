import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStatisticComponent } from './tasks-statistic.component';

describe('TasksStatisticComponent', () => {
  let component: TasksStatisticComponent;
  let fixture: ComponentFixture<TasksStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticComponent ]
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
