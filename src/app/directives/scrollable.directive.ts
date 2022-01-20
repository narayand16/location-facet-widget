import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollable]',
})
export class ScrollableDirective {
  constructor(private element: ElementRef) {}
  set scrollTop(value: number) {
    this.element.nativeElement.scrollTop = value;
  }
}
