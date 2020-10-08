import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output() clickOutside = new EventEmitter<void>();
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(null);
    }
  }
}
