import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TestData } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksFiltersComponent } from './tasks-filters.component';

const { priorities, tasksFilter: filter } = TestData.data;

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
    component.priorities = priorities;

    fixture.detectChanges();
    spyOn(component.setFilter, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form and dispatch setFilter', () => {
    component.onSetQuery(filter);

    expect(component.filtersForm.value).toEqual(filter);
    expect(component.setFilter.emit).toHaveBeenCalledTimes(1);
    expect(component.setFilter.emit).toHaveBeenCalledWith(filter);
  });

  it('should reset form and dispatch setFilter', () => {
    component.filtersForm.patchValue(filter);
    expect(component.filtersForm.value).toEqual(filter);

    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(component.filtersForm.value).toEqual({ ...filter, q: null });
    expect(component.filter.filtersForm.value).toEqual({ q: null });

    expect(component.setFilter.emit).toHaveBeenCalledTimes(1);
    expect(component.setFilter.emit).toHaveBeenCalledWith({ ...filter, q: null });
  });
});
