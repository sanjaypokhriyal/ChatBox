import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable,interval } from 'rxjs';
import {from } from 'rxjs';
import {ViewChild, ElementRef} from '@angular/core';
import {map} from 'rxjs/operators';
import {trigger,state,transition, style,animate, keyframes} from '@angular/animations'; 
import { MessagingService } from '../messaging.service';
import { FormGroup,FormControl } from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddConvoComponent } from '../Convo/add-convo/add-convo.component';
 
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  // animations:[
  //   trigger('ChatEnables',[
  //     transition(':enter', [
  //       animate('5s',keyframes([
  //         style({ background: 'linear-gradient(to right,rgba(5,62,84, 0.2),white)' }),
  //         style({ background: `linear-gradient(45deg,
  //                                 rgba(5,62,84, 0.2) 50%,
  //                                 transparent 25%,
  //                     rgba(5,62,84, 0.2) 75%,
  //                     transparent 75%,
  //           transparent)` }),
          
  //       ])),
  //     ]),
  //     // state('open',
  //     // style({
  //     //   top: '0px',
  //     // })),
  //     // transition('void => *', [
  //     //   style({
  //     //     top: '0px',
  //     //   }),
  //     //   animate(100)
  //     // ])
  //   ])
  // ]
})
export class ConversationComponent implements OnInit,AfterViewChecked {
 
  widht="25%";
  username:string;
  showMembers=false;
  Members:Array<object>;
  audio = new Audio();
  @ViewChild('MyChats') private myChats: ElementRef;

  constructor(private ms: MessagingService, private router: Router,private  route: ActivatedRoute,private dialog: MatDialog) { 

    // alert(this.selectedConversation.id);
    this.audio.src = "../../../assets/NotificationSound.ogg";
    this.audio.load();

      interval(1000).subscribe(val=>{
        
        if(this.selectedConversation!=undefined && this.selectedConversation.id!=undefined && this.selectedConversation.id==this.conversationId) 
        this.selectConversation(this.selectedConversation.id);
      });
  }
 
  buildConversationsArray(conversations) {
    let array = [];
 
    for (let conversation in conversations) {
      array.push(conversations[conversation]);
    }
 
    return array
  }
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['us']) { 
        this.username=params['us'];
      }
    });
    this.RefreshConvo();
      this.ms.getMembers().subscribe((members)=>{
          this.Members=members["Members"];
          // console.log(this.Members);
      });

      this.scrollToBottom();
   }
 
selectConversation(conversationId: number) {

  this.conversationId=conversationId;
  // console.log(conversationId);
  // if(this.selectedConversation!=undefined && this.selectedConversation.id!=conversationId)
  //   this.releaseConvo(); 
  

  // this.ms.CheckMessages(conversationId).subscribe(res=>{
    // alert();

      //  if(this.selectedConversation ==undefined || (JSON.stringify( res)!=this.selectedConversation.events.length))
        this.ms.GetSelectedconverstion(conversationId).subscribe(conversation => {
          
          // if(this.selectedConversation !=undefined ){
          // console.log(conversation);}
          if(this.selectedConversation ==undefined  || (  conversation["data"].events.length!=this.selectedConversation.events.length) )
          this.updateConversation(conversation);
        }
        
        )
  // })
  }

  NotifyMessage(){
    // this.audio = new Audio();
    this.audio.play();
  }

  updateConversation(conversation){


      this.releaseConvo();    
      this.selectedConversation = conversation["data"];
      this.selectedConversationData=conversation["data"];
      console.log(this.username)
      console.log(this.selectedConversation.events)
      from(this.selectedConversation.events).subscribe(
        event => {
          //  console.log(event);
          //  alert(event.body.text)
          //  event.body.text=``;
          // console.log(event.body.text);
          this.events.push(event)
          if(event.from!=this.username)
          this.NotifyMessage();
        }
      )
 
  }

  scrollToBottom(): void {
    try {
        // this.myChats.nativeElement.scrollTop = this.myChats.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
 
  sendText(message: string) {
    console.log(message);
    let obj={
            ConvoID:this.selectedConversation.id,
            from:this.username,
            type:'text',
            // body:{
              text:message,
            // }
          };
    this.ms.InsertConvo(obj).subscribe(val=>{
      this.text="";
    });
  }

  ChatWith(member){
    // alert(member);
        const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;

        dialogConfig.data = {
          id: 1,
          description: 'Start Chatting',
          title:'CREATE CONVERSATION',
          members:this.Members,
          member:member
      };
  
        dialogConfig.position = {
          top: '5%',
          left:'40%'
        };
        dialogConfig.hasBackdrop=true;
        dialogConfig.panelClass="panelClass";
        // this.dialog.open(AddConvoComponent, dialogConfig);
        const dialogRef = this.dialog.open(AddConvoComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
          (data) => {console.log("Dialog output:", data)

                    this.ms.AddConversation(data.ConversationName).subscribe(
                      (val)=>{
                        let convoId=val["data"].id;
                        let AddToEvents=Array<object>();
    
                        data.AddedMembers.forEach((val,i)=>{
                          val.ConvoID=convoId;
                          val.key=0;
                          AddToEvents.push(
                            {
                              ConvoID:convoId,
                              from:val.value,
                              type:'member:joined',
                              // body:{
                              text:'member:joined',
                              // }
                            }
                          );
                        });
                        this.ms.InsertAddedToConversation(data.AddedMembers,AddToEvents).subscribe(
                          (res)=>{
                            console.log(convoId);
                            this.selectConversation(convoId);
                          }
                        );
                      }
                    );
                    }
      );  
  }

  releaseConvo(){
    this.selectedConversation=this.selectedConversationData={};
    this.events=[];
  }
 
  AddSelectedMembers(AddedMembers:Array<object>){
    let AddToEvents=Array<object>();
    
    AddedMembers.forEach((val,i)=>{
      val.ConvoID=this.conversationId;
      val.key=0;
      AddToEvents.push(
        {
          ConvoID:this.conversationId,
          from:val.value,
          type:'member:joined',
          // body:{
          text:'member:joined',
          // }
        }
      );
    });
    // console.log(AddedMembers);
    
    this.selectedConversation.Members.push(...AddedMembers);
    this.ms.InsertAddedToConversation(AddedMembers,AddToEvents).subscribe(
      (res)=>{
        console.log(res);
      }
    );
  }

  RefreshConvo(){

    this.ms.getChats( this.username).subscribe(
      (val)=>{
        console.log(val)
        this.conversations=val["data"];
      }
    );
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  conversations=[];
  conversationId:number;
  selectedConversation: any;
  selectedConversationData:any;
  text: string;
  events: Array<any> = [];
}

