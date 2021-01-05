import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TestData } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractTasksListComponent } from './abstract.tasks-list.component';

const { tasks, categoriesEntities, categories, prioritiesEntities, priorities } = TestData.data;

@Component({
  template: `
    <div *ngIf="tasks?.length" class="tasks">
      <div
        *ngFor="let task of tasks"
        (click)="onTaskEdit(task)"
        class="task"
      ></div>
    </div>
    <div class="categories">
      <div
        *ngFor="let category of categories | keyvalue"
        (click)="onCategorySelect(category.value, $event)"
        class="category"
      ></div>
    </div>
    <div class="priorities">
      <div
        *ngFor="let priority of priorities | keyvalue"
        class="priority"
      >{{ priority.value }}</div>
    </div>
  `
})
class TasksListComponent extends AbstractTasksListComponent {
  onTaskEditWithoutModalOpen(): void {
    this.dispatchEdit(tasks[0]);
  }
}

describe('AbstractTasksListComponent', () => {
  let fixture: ComponentFixture<TasksListComponent>;
  let component: TasksListComponent;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      imports: [SharedModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    spyOn(component.taskEdit, 'emit');
    spyOn(component.categorySelect, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tasks', () => {
    component.tasks = tasks;
    fixture.detectChanges();

    expect(el.queryAll(By.css('.task')).length).toBe(tasks.length);
  });

  it('should render categories', () => {
    component.categories = categoriesEntities;
    fixture.detectChanges();

    expect(el.queryAll(By.css('.category')).length).toBe(categories.length);
  });

  it('should render priorities', () => {
    component.priorities = prioritiesEntities;
    fixture.detectChanges();

    expect(el.queryAll(By.css('.priority')).length).toBe(priorities.length);
  });

  describe('taskEdit', () => {
    it('should dispatch taskEdit with openModal', () => {
      component.tasks = tasks;
      fixture.detectChanges();
      el.query(By.css('.task:first-child')).triggerEventHandler('click', null);

      expect(component.taskEdit.emit).toHaveBeenCalledTimes(1);
      expect(component.taskEdit.emit).toHaveBeenCalledWith({ task: tasks[0], openModal: true });
    });

    it('should dispatch taskEdit without openModal', () => {
      component.onTaskEditWithoutModalOpen();

      expect(component.taskEdit.emit).toHaveBeenCalledTimes(1);
      expect(component.taskEdit.emit).toHaveBeenCalledWith({ task: tasks[0], openModal: false });
    });
  });

  describe('categorySelect', () => {
    let event: jasmine.SpyObj<MouseEvent>;

    beforeEach(() => {
      event = jasmine.createSpyObj('event', ['stopPropagation']);
    });

    it('should dispatch categorySelect with stopPropagation', () => {
      component.categories = categoriesEntities;
      fixture.detectChanges();
      el.query(By.css('.category:first-child')).triggerEventHandler('click', event);

      expect(component.categorySelect.emit).toHaveBeenCalledTimes(1);
      expect(component.categorySelect.emit).toHaveBeenCalledWith(categories[0]);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should dispatch categorySelect without stopPropagation', () => {
      component.categories = categoriesEntities;
      fixture.detectChanges();
      el.query(By.css('.category:last-child')).triggerEventHandler('click', null);

      expect(component.categorySelect.emit).toHaveBeenCalledTimes(1);
      expect(component.categorySelect.emit).toHaveBeenCalledWith(categories[categories.length - 1]);
      expect(event.stopPropagation).toHaveBeenCalledTimes(0);
    });
  });
});
