import { Component, OnInit,Input,Output,EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  RemainingMembers:Array<object>;
  _AddMembers:boolean=true;
  @Input()Members:Array<object>;
  @Input()AddToConvo:boolean;
  @Input()SelectedConvoMembers:Array<object>;
  @Input('Save')
  set Save(value: boolean) {
    // alert(value);
    this._AddMembers=false;
    if(value)
    this.AddMembers();
  }
  @Output()SelectedMembers=new EventEmitter<any>();
  

  constructor() {
   }

  ngOnInit() {
    this.Members.forEach((val,i)=>{
      val.UserName=val.value;
      val.value=val.key;
    })
    this.RemainingMembers= this.Members.filter(x=> !this.SelectedConvoMembers.filter(y=>y.value==x.key).length );
  }

  MemberSelected(){
    this.RemainingMembers=this.RemainingMembers.sort(x=>x.selected).reverse();
     
  }
  AddMembers(){
    this.SelectedMembers.emit(this.RemainingMembers.filter(x=>x.selected));
     this.RemainingMembers= this.RemainingMembers.filter(x=>!x.selected);
  }

}
