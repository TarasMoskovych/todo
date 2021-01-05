import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestData } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksCardsComponent } from './tasks-cards.component';

const { tasks } = TestData.data;

describe('TasksCardsComponent', () => {
  let component: TasksCardsComponent;
  let fixture: ComponentFixture<TasksCardsComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksCardsComponent ],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCardsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.tasks = tasks;

    fixture.detectChanges();
    spyOn(component.taskEdit, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch taskEdit', () => {
    el.query(By.css('button')).nativeElement.click();
    expect(component.taskEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.taskEdit.emit).toHaveBeenCalledWith({
      task: { ...tasks[0], completed: !tasks[0].completed }, openModal: false,
    });
  });
});
