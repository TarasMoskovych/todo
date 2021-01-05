import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState, registerStore } from 'src/app/core/+store';
import { CategoryEntity, Task, TestData } from 'src/app/models';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskFormComponent } from './task-form.component';

const { tasks, categories } = TestData.data;
const task: Task = tasks[0];
const category: CategoryEntity = {
  [categories[0].id]: categories[0],
};

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let el: DebugElement;
  let dalogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    dalogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: task },
        { provide: MatDialog, useValue: dalogSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change task status', () => {
    fixture.detectChanges();
    component.onChange();

    expect(component.taskForm.value.completed).toEqual(!task.completed);
  });

  it('should submit form and close dialog', () => {
    fixture.detectChanges();
    component.onSubmit();

    expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
    expect(matDialogRefSpy.close).toHaveBeenCalledWith({ task, remove: false });
  });

  describe('remove task', () => {
    let removeBtn: DebugElement;

    beforeEach(() => {
      fixture.detectChanges();
      removeBtn = el.query(By.css('button.ml-1'));
    });

    it('should open ConfirmDialogComponent', () => {
      dalogSpy.open.and.returnValue({ afterClosed: () => of() } as MatDialogRef<typeof component>);
      removeBtn.triggerEventHandler('click', null);
      expect(matDialogRefSpy.close).toHaveBeenCalledTimes(0);
    });

    it('should open ConfirmDialogComponent and close dialogRef with task', () => {
      dalogSpy.open.and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
      removeBtn.triggerEventHandler('click', null);
      expect(matDialogRefSpy.close).toHaveBeenCalledTimes(1);
      expect(matDialogRefSpy.close).toHaveBeenCalledWith({ task, remove: true });
    });

    afterEach(() => {
      expect(dalogSpy.open).toHaveBeenCalledTimes(1);
      expect(dalogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent, {
          data: {
            message: `Do you want to remove "${task.name}" task?`
          },
          width: '40%',
        },
      );
    });
  });

  describe('build form', () => {
    let p: DebugElement;

    beforeEach(() => {
      p = el.query(By.css('p'));
    });

    it('should build form without task date', () => {
      component.task = { id: '1', completed: false, name: 'test' };
      fixture.detectChanges();

      expect(component.taskForm.value.date).toBeDefined();
      expect(p.nativeElement.textContent).toContain('Edit task');
    });

    it('should build form with task date', () => {
      fixture.detectChanges();

      expect(component.taskForm.value.date).toBe(task.date);
      expect(p.nativeElement.textContent).toContain('Edit task');
    });

    it('should build form with empty values when task is not passed', () => {
      component.task = null;
      fixture.detectChanges();

      expect(p.nativeElement.textContent).toContain('Add task');
      expect(component.taskForm.value.name).toBeNull();
    });
  });

  describe('get category', () => {
    beforeEach(() => {
      spyOn(store, 'select').and.returnValue(of(category));
    });

    it('should not update category control when task is defined', () => {
      fixture.detectChanges();
      expect(store.select).toHaveBeenCalledTimes(0);
      expect(component.taskForm.value.category).toBe(task.category);
    });

    it('should update category control when task is not defined', () => {
      component.task = null;
      fixture.detectChanges();
      expect(store.select).toHaveBeenCalledTimes(1);
      expect(component.taskForm.value.category).toBe(category.id);
    });
  });
});
