import { Component, DebugElement, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  template: `
    <p>Content 1</p>
    <p appClickOutside (clickOutside)="onClickOutside()">Content 2</p>
  `
})
class TestHostComponent {
  onClickOutside() {}
}

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let directive: ClickOutsideDirective;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ClickOutsideDirective],
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    directive = el.query(By.css('p:last-child')).injector.get(ClickOutsideDirective);

    spyOn(component, 'onClickOutside');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit value', () => {
    el.query(By.css('p:first-child')).nativeElement.click();
    expect(component.onClickOutside).toHaveBeenCalledTimes(1);
  });

  it('should not emit value', () => {
    el.query(By.css('p:last-child')).nativeElement.click();
    expect(component.onClickOutside).toHaveBeenCalledTimes(0);
  });

});
