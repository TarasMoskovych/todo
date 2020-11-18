import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/shared/shared.module';
import { TasksFiltersComponent } from './tasks-filters.component';

describe('TasksFiltersComponent', () => {
  let component: TasksFiltersComponent;
  let fixture: ComponentFixture<TasksFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksFiltersComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
