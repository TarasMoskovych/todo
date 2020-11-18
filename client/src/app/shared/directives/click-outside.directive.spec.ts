import { ElementRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ClickOutsideDirective } from './click-outside.directive';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('ClickOutsideDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ],
    })
    .compileComponents();
  }));

  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
