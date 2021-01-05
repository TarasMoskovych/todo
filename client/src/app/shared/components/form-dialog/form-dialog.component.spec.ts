import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from './form-dialog.component';

const data = {
  name: 'name',
  title: 'modal title',
};

describe('FormDialogComponent', () => {
  let component: FormDialogComponent;
  let fixture: ComponentFixture<FormDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FormDialogComponent>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let el: DebugElement;

  beforeEach(async(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [FormDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('modal title', () => {
    let title: DebugElement;

    beforeEach(() => {
      title = el.query(By.css('p'));
    });

    it('should have default title', () => {
      component.data = {} as any;
      fixture.detectChanges();

      expect(title.nativeElement.textContent).toContain('Edit modal');
    });

    it('should have custom title', () => {
      fixture.detectChanges();
      expect(title.nativeElement.textContent).toContain(data.title);
    });
  });

  describe('submit form', () => {
    it('should submit form and close dialog with data', () => {
      fixture.detectChanges();
      component.form.patchValue({ [data.name]: 'test value' });
      component.onSubmit();

      expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
      expect(dialogRefSpy.close).toHaveBeenCalledWith({ name: 'test value', remove: false });
    });
  });

  describe('remove button', () => {
    const clickOnRemove = () => el.query(By.css('div.w-100 > button')).triggerEventHandler('click', null);

    it('should open ConfirmDialogComponent', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<typeof component>);
      fixture.detectChanges();
      clickOnRemove();

      expect(dialogRefSpy.close).toHaveBeenCalledTimes(0);
    });

    it('should open ConfirmDialogComponent and close dialog with data', () => {
      dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
      fixture.detectChanges();
      clickOnRemove();

      expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
      expect(dialogRefSpy.close).toHaveBeenCalledWith({ name: data.name, remove: true });
    });

    afterEach(() => {
      expect(dialogSpy.open).toHaveBeenCalledTimes(1);
      expect(dialogSpy.open).toHaveBeenCalledWith(
        ConfirmDialogComponent, {
          data: {
            message: `Do you want to remove "${data.name}"?`
          },
          width: '40%',
        }
      );
    });
  });
});
