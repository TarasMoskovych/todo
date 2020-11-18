import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { registerStore } from 'src/app/core/+store';
import { SharedModule } from 'src/app/shared/shared.module';

import { PrioritiesTableComponent } from '../priorities-table/priorities-table.component';
import { PrioritiesDialogComponent } from './priorities-dialog.component';

describe('PrioritiesDialogComponent', () => {
  let component: PrioritiesDialogComponent;
  let fixture: ComponentFixture<PrioritiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesDialogComponent, PrioritiesTableComponent ],
      imports: [
        SharedModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(PrioritiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
