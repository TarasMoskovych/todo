import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { TasksTableComponent } from './tasks-table.component';

describe('TasksTableComponent', () => {
  let component: TasksTableComponent;
  let fixture: ComponentFixture<TasksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksTableComponent ],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
