import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOffsetTop]',
})
export class OffsetTopDirective {
  constructor(private element: ElementRef) {}
  get offsetTop(): number {
    return this.element.nativeElement.offsetTop;
  }
}
