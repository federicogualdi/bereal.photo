import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img:not([loading])'
})
export class LazyImgDirective {
  constructor(el: ElementRef) {
    el.nativeElement.setAttribute('loading', 'lazy')
  }
}
