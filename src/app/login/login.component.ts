import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger,state,transition, style,animate, keyframes} from '@angular/animations'; 
import { MessagingService } from '../messaging.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //  animations:[
  //   trigger('ChatEnables',[
  //     state('close', style({
  //       left:'-1000%',
  //     })),
  //     transition('* => close', [
  //       animate('1s')
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
export class LoginComponent implements OnInit {
 
  username: string = ""
  showSpinner=false;
  Isauthentic=false;
  constructor(private ms: MessagingService, private router: Router) { }
 
  ngOnInit() {
    this.ms.initialize()
  }
 
  onLogin() {
    if(this.username!=="")
    this.ms.getUserJwt(this.username).subscribe(this.authenticate.bind(this))
  }
 
  authenticate(Isauthenticated: boolean) {
    // this.ms.client.login().subscribe(
    //   (chats)=>{

    //   }
    // );
    this.showSpinner=false;
    if(Isauthenticated){
      this.Isauthentic=true;
      this.router.navigate(['/conversation', {us: this.username}]);
      this.ms.app=true;
    }
    // this.ms.client.login(userJwt).then(app => {
    //   this.ms.app = app
    // alert("asdad")
    // console.log(Isauthenticated);
      // this.router.navigate(['/conversation']);
    // })
  }
  
}