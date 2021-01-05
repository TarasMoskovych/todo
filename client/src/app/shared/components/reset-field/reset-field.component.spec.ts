import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../shared.module';

@Component({
  template: `
    <app-reset-field
      [form]="form"
      [control]="control"
      (reset)="onReset()"
    ></app-reset-field>
  `
})
class TestHostComponent {
  control = 'name';
  form = new FormGroup({
    [this.control]: new FormControl('test'),
  });

  onReset() {}
}

describe('ResetFieldComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        SharedModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout', () => {
    fixture.detectChanges();
    expect(el.queryAll(By.css('button')).length).toBe(1);
  });

  it('should not render when form is not passed', () => {
    component.form = null;
    fixture.detectChanges();
    expect(el.queryAll(By.css('button')).length).toBe(0);
  });

  it('should emit reset', () => {
    spyOn(component, 'onReset');
    fixture.detectChanges();

    expect(component.form.value).toEqual({ [component.control]: 'test' });

    el.query(By.css('button')).nativeElement.click();
    expect(component.form.value).toEqual({ [component.control]: null });
    expect(component.onReset).toHaveBeenCalledTimes(1);
  });
});
