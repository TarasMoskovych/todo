import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Color, MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

import { TestData, Priority } from 'src/app/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriorityFormComponent } from './priority-form.component';

const priority: Priority = TestData.data.priorities[0];

describe('PriorityFormComponent', () => {
  let component: PriorityFormComponent;
  let fixture: ComponentFixture<PriorityFormComponent>;
  let dialogRef: MatDialogRef<PriorityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityFormComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        NgxMatColorPickerModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFormComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with partial priority', () => {
    component.priority = null;
    fixture.detectChanges();
    expect(component.pickerInput.value).toBeNull();
  });

  it('should build the form with empty values', () => {
    fixture.detectChanges();

    expect(component.priorityForm.value).toEqual({ name: null, color: null });
  });

  it('should build the form with priority values', () => {
    component.priority = priority;
    fixture.detectChanges();

    expect(component.priorityForm.value).toEqual({ name: priority.name, color: priority.color });
  });

  it('should submit the form', () => {
    component.priority = priority;
    fixture.detectChanges();
    component.onSubmit();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith(priority);
  });

  it('should submit the form with custom color', () => {
    component.priority = priority;
    fixture.detectChanges();
    component.priorityForm.patchValue({ color: new Color(255, 255, 255) });
    component.onSubmit();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
    expect(dialogRef.close).toHaveBeenCalledWith({ ...priority, color: '#ffffff' });
  });
});
