import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PriorityEntity } from 'src/app/core/+store';
import { CategoryEntity, Task, TestData } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksTableComponent } from './tasks-table.component';

const { categoriesEntities, tasks, prioritiesEntities } = TestData.data;

@Component({
  template: `
    <app-tasks-table
      [categories]="categories"
      [priorities]="priorities"
      [tasks]="tasks"
      (taskEdit)="onTaskEdit($event)"
      (taskRemove)="onTaskRemove($event)"
    ></app-tasks-table>
  `
})
class TestHostComponent {
  categories: CategoryEntity = categoriesEntities;
  priorities: PriorityEntity = prioritiesEntities;
  tasks: Task[] = tasks;

  onTaskEdit(e: { task: Task, openModal: boolean }) {}
  onTaskRemove(task: Task) {}
}

describe('TasksTableComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;
  let tasksTableComponent: TasksTableComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TasksTableComponent],
      imports: [
        NoopAnimationsModule,
        SharedModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    tasksTableComponent = el.query(By.directive(TasksTableComponent)).injector.get(TasksTableComponent);
    fixture.detectChanges();

    spyOn(component, 'onTaskEdit');
    spyOn(component, 'onTaskRemove');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskEdit', () => {
    tasksTableComponent.onTaskCheck({ checked: true } as MatCheckboxChange, tasks[0]);
    expect(component.onTaskEdit).toHaveBeenCalledTimes(1);
    expect(component.onTaskEdit).toHaveBeenCalledWith({ task: { ...tasks[0], completed: true }, openModal: false });
  });

  it('should emit taskRemove', () => {
    el.query(By.css('.remove')).triggerEventHandler('click', null);
    expect(component.onTaskRemove).toHaveBeenCalledTimes(1);
  });

  describe('sorting', () => {
    let sortEl: DebugElement[];

    beforeEach(() => {
      sortEl = el.queryAll(By.css('.mat-sort-header-container'));
    });

    const getContent = () =>  el.query(By.css('td.cdk-column-name')).nativeElement.textContent;

    it('should sort tasks by name', () => {
      sortEl[0].nativeElement.click();
      expect(getContent()).toBe(tasks.sort((t1: Task, t2: Task) => t1.name.localeCompare(t2.name))[0].name);
    });

    it('should sort tasks by priority', () => {
      sortEl[2].nativeElement.click();
      expect(getContent()).toBe(tasks.filter((t: Task) => !t.priority)[0].name);
    });

    it('should sort tasks by category', () => {
      sortEl[3].nativeElement.click();
      expect(getContent()).toBe(tasks.sort((t1: Task, t2: Task) => Number.parseInt(t1.category) - Number.parseInt(t2.category))[0].name);
    });
  });
});
