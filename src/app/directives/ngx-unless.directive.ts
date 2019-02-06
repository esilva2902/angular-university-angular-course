import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})
export class NgxUnlessDirective {

  private visible: boolean = false;

  /**
   * @param templateRef is a reference of an automatic created <ng-template>.
   * @param viewContainer is the container where the templateRef is going to be instanciated.
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  /**
   * In order to evaluate if the content of <ng-template> is visible or not
   * we have to pass the condition to evaluate via an input property. 
   * 
   * The input property has to have the same name of the directive itself
   * otherwise it will not work. 
   */
  @Input('ngxUnless')
  set ngxUnless(condition: boolean) {
    if (!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;

    } else {
      this.viewContainer.clear();
      this.visible = false;

    }
  }
}
