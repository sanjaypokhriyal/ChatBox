import { Component, OnInit,ViewChild,ElementRef, AfterViewChecked,Renderer,HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewChecked {

  @ViewChild('Header') private Header: ElementRef;
  Scrolled=false;
  constructor(private renderer:Renderer) { }

  ngOnInit() {
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(){
    // console.log('scrolled')
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.Scrolled=document.documentElement.scrollTop >0;
    // if(document.documentElement.scrollTop >0){
    //   // this.renderer.setElementStyle(this.Header.nativeElement, 'backgroundColor', ' rgba(3, 177, 177,1)');
    // }
    // else{
    //   this.renderer.setElementStyle(this.Header.nativeElement, 'backgroundColor', ' linear-gradient(to bottom, rgba(3, 177, 177,1), rgba(3, 177, 177,0.5) , transparent);');
    // }
  }

  ngAfterViewChecked(){
    // this.myChats.nativeElement.style. = this.myChats.nativeElement.scrollHeight;
    // if(this.Header.nativeElement.scrollHeight==)
    // this.renderer.setElementStyle(this.Header.nativeElement, 'backgroundColor', ' rgba(3, 177, 177,1)');
  }
}
