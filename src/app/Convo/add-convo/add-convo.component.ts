import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormGroup,FormBuilder, FormArray, FormControl, ValidatorFn} from "@angular/forms";
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-add-convo',
  templateUrl: './add-convo.component.html',
  styleUrls: ['./add-convo.component.css']
})
export class AddConvoComponent implements OnInit {

  _AddedMembers:Array<object>;
  ConvoName:String;
  Save:boolean=false;
  form: FormGroup;
  Members:Array<object>;
  member:string;
  SelectedMembers:Array<object>;
  description:string;
  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddConvoComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

        this.Members = data.members;
        //  console.log(data.member);

        //  console.log(data.members);
        this.description=data.description;
        this.member = data.member;
        this.SelectedMembers=this.Members.filter(x=>x.key===data.member);
        // console.log(this.SelectedMembers);
        const controls = this.Members.map(c => new FormControl(false));
       
        controls.filter(x=>x.value==this.member).forEach((val,i)=>{
          controls[i].setValue(true);
        });

      //   this.form = this.fb.group({
      //     ConvoName: new FormControl(),
      //     Members: new FormArray(controls)
      // });
  }

  ngOnInit() {
  }

  save() {
    if(this.ConvoName !=undefined)
      this.Save=true;
    
      // this.dialogRef.close(ResponseDetail);
  }

  close() {
      this.dialogRef.close();
  }

  AddSelectedMembers(AddedMembers:Array<object>){
    // console.log(AddedMembers);
    AddedMembers.push(this.SelectedMembers[0])
    this._AddedMembers=AddedMembers;
    let ResponseDetail=new Object();
    ResponseDetail.ConversationName=this.ConvoName;
    ResponseDetail.AddedMembers=this._AddedMembers;
    // console.log(ResponseDetail);
    this.dialogRef.close(ResponseDetail);
  }
}
