import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState, CreateTask, FilterTasks, registerStore, RemoveTask, SelectCategory, UpdateTask } from '../core/+store';
import { TestData, Task } from '../models';
import { ConfirmDialogComponent } from '../shared/components';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './components';
import { TasksComponent } from './tasks.component';

const { tasks, categories, tasksFilter } = TestData.data;
const task: Task = tasks[0];

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let store: Store<AppState>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SelectCategory', () => {
    spyOn(store, 'dispatch');
    component.onCategorySelect(categories[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new SelectCategory(categories[0]));
  });

  it('should dispatch FilterTasks', () => {
    spyOn(store, 'dispatch');
    component.onSetFilter(tasksFilter);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new FilterTasks(tasksFilter));
  });

  describe('AddTask', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should open TaskFormComponent dialog', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      component.onTaskAdd();

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should open TaskFormComponent dialog and dispatch CreateTask', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of({ task }) } as MatDialogRef<typeof component>);
      component.onTaskAdd();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new CreateTask(task));
    });

    afterEach(() => {
      expect(dialogSpy.open).toHaveBeenCalledWith(TaskFormComponent, { width: '50%' })
    });
  });

  describe('EditTask', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    const openDialogAsserts = () => {
      expect(dialogSpy.open).toHaveBeenCalledTimes(1);
      expect(dialogSpy.open).toHaveBeenCalledWith(TaskFormComponent, { data: task, width: '50%' });
    };

    it('should update task without opening the modal', () => {
      component.onTaskEdit({ openModal: false, task });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new UpdateTask(task));
      expect(dialogSpy.open).toHaveBeenCalledTimes(0);
    });

    it('should open TaskFormComponent', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      component.onTaskEdit({ openModal: true, task });

      expect(store.dispatch).toHaveBeenCalledTimes(0);
      openDialogAsserts();
    });

    it('should open TaskFormComponent and dispatch UpdateTask', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of({ task }) } as MatDialogRef<typeof component>);
      component.onTaskEdit({ openModal: true, task });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new UpdateTask(task));
      openDialogAsserts();
    });

    it('should open TaskFormComponent and dispatch RemoveTask', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of({ task, remove: true }) } as MatDialogRef<typeof component>);
      component.onTaskEdit({ openModal: true, task });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new RemoveTask(task));
      openDialogAsserts();
    });
  });

  describe('RemoveTask', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should open ConfirmDialogComponent', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<typeof component>);
      component.onTaskRemove(task);

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should open ConfirmDialogComponent and dispatch RemoveTask', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
      component.onTaskRemove(task);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new RemoveTask(task));
    });

    afterEach(() => {
      expect(dialogSpy.open).toHaveBeenCalledTimes(1);
      expect(dialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent, {
          data: {
            message: `Do you want to remove "${task.name}" task?`
          },
          width: '40%',
        }
      );
    });
  });
});
