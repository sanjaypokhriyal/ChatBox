import { Directive,HostListener,ElementRef,Renderer,Input  } from '@angular/core';

@Directive({
  selector: '[SelectMember]'
})
export class SelectMemberDirective {

  @Input() IsChecked: string;

  constructor(private el: ElementRef,private renderer: Renderer) {
    // alert(this.el.nativeElement) ;
      // let part = this.el.nativeElement.querySelector('.messages');
      // renderer.setElementStyle(part, 'float', 'right');
     alert(this.IsChecked);
    }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
