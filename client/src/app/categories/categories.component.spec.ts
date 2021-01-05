import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState, CreateCategory, FilterCategories, GetCategories, registerStore, RemoveCategory, SelectCategory, UpdateCategory } from '../core/+store';
import { Category, Filter } from '../models';
import { FormDialogComponent } from '../shared/components';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let store: Store<AppState>;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
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
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new GetCategories());
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('add category', () => {
    it('should only open dialog', () => {
      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      component.onCategoryAdd();

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should open dialog and add a category', () => {
      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ name: 'Test' }) } as MatDialogRef<typeof component>);
      component.onCategoryAdd();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new CreateCategory({ name: 'Test', id: null }));
    });

    afterEach(() => {
      expect(dialog.open).toHaveBeenCalledTimes(1);
      expect(dialog.open).toHaveBeenCalledWith(FormDialogComponent, { width: '50%', data: { title: 'Add category' } });
    });
  });

  describe('edit category', () => {
    const category = { name: 'Old', id: '5' };

    it('should only open dialog', () => {
      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(undefined) } as MatDialogRef<typeof component>);
      component.onCategoryEdit(category);

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should open dialog and edit a category', () => {
      spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ name: 'New' }) } as MatDialogRef<typeof component>);
      component.onCategoryEdit(category);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(new UpdateCategory({ ...category, name: 'New' }));
    });

    afterEach(() => {
      expect(dialog.open).toHaveBeenCalledTimes(1);
      expect(dialog.open).toHaveBeenCalledWith(FormDialogComponent, { width: '50%', data: { name: category.name, title: 'Edit category' } });
    });
  });

  it('should remove a category', () => {
    const category = { name: 'Test', id: '5' };

    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of({ name: category.name, remove: true }) } as MatDialogRef<typeof component>);
    component.onCategoryEdit(category);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveCategory(category));
  });

  it('should set filters', () => {
    const filter: Filter = { q: 'search value' };

    component.onSetFilter(filter);

    expect(store.dispatch).toHaveBeenCalledWith(new FilterCategories(filter));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should sort by categories', () => {
    const category: Category = { id: '1', name: 'Test' };

    component.onSortByCategory(category);

    expect(store.dispatch).toHaveBeenCalledWith(new SelectCategory(category));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
