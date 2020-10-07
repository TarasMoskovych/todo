import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStatisticCardComponent } from './tasks-statistic-card.component';

describe('TasksStatisticCardComponent', () => {
  let component: TasksStatisticCardComponent;
  let fixture: ComponentFixture<TasksStatisticCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksStatisticCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksStatisticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
