import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState, CreatePriority, registerStore, UpdatePriority } from 'src/app/core/+store';
import { TestData } from 'src/app/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrioritiesTableComponent } from '../priorities-table/priorities-table.component';
import { PriorityFormComponent } from '../priority-form/priority-form.component';
import { PrioritiesDialogComponent } from './priorities-dialog.component';

const { priorities } = TestData.data;

describe('PrioritiesDialogComponent', () => {
  let component: PrioritiesDialogComponent;
  let fixture: ComponentFixture<PrioritiesDialogComponent>;
  let el: DebugElement;
  let store: Store<AppState>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritiesDialogComponent, PrioritiesTableComponent ],
      imports: [
        SharedModule,
        MatDialogModule,
        ...registerStore(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);

    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.returnValue(of(priorities));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add priority modal', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as MatDialogRef<typeof component>);

    el.query(By.css('h4 button')).triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(PriorityFormComponent, { data: undefined, width: '40%' });
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should open add priority modal and dispatch add priority', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(priorities[0]) } as MatDialogRef<typeof component>);

    component.onPriorityAdd();

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(PriorityFormComponent, { data: undefined, width: '40%' });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreatePriority(priorities[0]));
  });

  it('should open edit priority modal and dispatch edit priority', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(priorities[0]) } as MatDialogRef<typeof component>);

    component.onPriorityEdit(priorities[0]);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(PriorityFormComponent, { data: priorities[0], width: '40%' });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdatePriority(priorities[0]));
  });

  it('should open remove priority modal', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<typeof component>);

    component.onPriorityRemove(priorities[0]);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(
      ConfirmDialogComponent, {
        data: {
          message: `Do you want to remove "${priorities[0].name}" priority?`
        },
        width: '40%'
      },
    );
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should open remove priority modal and dispatch remove priority', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);

    component.onPriorityRemove(priorities[0]);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(dialog.open).toHaveBeenCalledWith(
      ConfirmDialogComponent, {
        data: {
          message: `Do you want to remove "${priorities[0].name}" priority?`
        },
        width: '40%'
      },
    );
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
