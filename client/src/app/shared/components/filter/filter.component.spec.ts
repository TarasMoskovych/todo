import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../shared.module';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    spyOn(component.setFilter, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have wrapperClass', () => {
    component.wrapperClass = 'test';
    fixture.detectChanges();

    expect(el.query(By.css('.row > div')).nativeElement.classList).toContain('test');
  });

  it('should have labelText', () => {
    component.labelText = 'test label';
    fixture.detectChanges();

    expect(el.query(By.css('label')).nativeElement.textContent).toBe('test label');
  });

  it('should submit the form', () => {
    fixture.detectChanges();
    component.submit();

    expect(component.setFilter.emit).toHaveBeenCalledTimes(1);
    expect(component.setFilter.emit).toHaveBeenCalledWith(component.filtersForm.value);
  });

  it('should submit the form onKeyup debounced event', fakeAsync(() => {
    fixture.detectChanges();
    const input: HTMLInputElement = el.query(By.css('input')).nativeElement;
    input.value = 'filter';
    input.dispatchEvent(new KeyboardEvent('keyup'));

    tick(300);

    expect(component.setFilter.emit).toHaveBeenCalledTimes(1);
    expect(component.setFilter.emit).toHaveBeenCalledWith(component.filtersForm.value);
  }));
});
