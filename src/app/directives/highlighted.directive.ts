import { Directive, HostBinding, Input, HostListener, Output, EventEmitter } from '@angular/core';

/**
 * exportAs is used to grab an instance of the directive in the template scope: 
 */

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {

  @Input('highlighted') isHighlighted = false;

  @Output() toggleHighlight = new EventEmitter();

  constructor() { 
    console.log(`highlighted created !`);
  }

  /**
   * @HostBinding is used to modify DOM properties or add
   * specific classes.
   */
  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  // @HostBinding('className')
  // get cssClasses() {
  //   return 'highlighted';
  // }

  // @HostBinding('style.border')
  // get border() {
  //   return '3px solid blue';
  // }

  // @HostBinding('style.width')
  // get width() {
  //   return '600px';
  // }

  /**
   * We can also use @HostBinding to add or set DOM
   * attributes:
   */
  @HostBinding('attr.disabled')
  get disabled() {
    return true;
  }

  /*************************************/

  /**
   * @HostListener takes the name of the DOM event as an argument.
   * @HostListener is great to interact with native DOM events.
   * 
   * In case we need we can inject the native event object:
   */
  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event);

    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  /**
   * Directives could have a public API:
   */
  public toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
