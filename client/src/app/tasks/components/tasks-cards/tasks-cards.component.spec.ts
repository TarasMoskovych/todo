import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCardsComponent } from './tasks-cards.component';

describe('TasksCardsComponent', () => {
  let component: TasksCardsComponent;
  let fixture: ComponentFixture<TasksCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
