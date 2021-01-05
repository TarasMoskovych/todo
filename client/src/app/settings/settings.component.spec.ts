import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { AppState, registerStore } from '../core/+store';
import { SharedModule } from '../shared/shared.module';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: Store<AppState>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [
        SharedModule,
        ...registerStore(),
      ],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch values on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch toggle and open dialog', () => {
    component.onPrioritiesDialogOpen();

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch set color', () => {
    component.onSetColor(null);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch set image', () => {
    component.onSetImage(null);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch toggle dark theme', () => {
    component.onToggleDarkTheme(null);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
