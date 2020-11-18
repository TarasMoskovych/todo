import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { registerStore } from 'src/app/core/+store';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriorityFormComponent } from './priority-form.component';

describe('PriorityFormComponent', () => {
  let component: PriorityFormComponent;
  let fixture: ComponentFixture<PriorityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityFormComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
