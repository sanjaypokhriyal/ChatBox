import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import {RequestOptions,URLSearchParams,Headers} from '@angular/http';
import { Observable,forkJoin } from 'rxjs';


// declare var ConversationClient: any;
const GATEWAY_URL = "http://localhost:65252/";

@Injectable()
export class MessagingService {

  // subject = new Subject();
  constructor(private http: HttpClient) {

  }

  initialize() {
    // this.client = new ConversationClient(
    // )
  }

  public client: any
  public app: any


  public getUserJwt(username: string): Observable<any> {
    
     return this.http.get(`${GATEWAY_URL}Messaging/Authenticate/${username}`);
    // return new Observable((observer) => {
    //     observer.next(`received ${username}`);
    // });
  
  }

  public getChats(username: string): Observable<any>{
    
    return this.http.get(`${GATEWAY_URL}Messaging/Chats/${username}`);
  }

  public downloadFile(){
    this.http.get(`${GATEWAY_URL}Messaging/ReadFile`,{responseType:'blob', observe: 'body'}).subscribe(
      (res)=>{
        console.log(res['body']);
      }
    );
  }

  public GetSelectedconverstion(id:number): Observable<any>{
    // console.log(`${GATEWAY_URL}Messaging/Selectedconverstion/${id}`)
    return this.http.get(`${GATEWAY_URL}Messaging/Selectedconverstion/${id}`);
  }

  public InsertConvo(convo:any): Observable<any>{
    return this.http.post(`${GATEWAY_URL}api/Messaging/InsertConvo`,convo  )
    // return this.http.post(`${GATEWAY_URL}api/Messaging/InsertConvo`,{objEvents: JSON.stringify(convo)
    // })
  }

  public CheckMessages(id:number): Observable<any>{
    return this.http.get(`${GATEWAY_URL}Messaging/CheckMessages/${id}`);
  }

  public getMembers():Observable<any>{
    return this.http.get(`${GATEWAY_URL}Messaging/Members/`);
  }

  public InsertAddedToConversation(AddToConvo,AddToEvents):Observable<any>{
   
     return forkJoin(
      this.http.post(`${GATEWAY_URL}api/Messaging/InsertToConversation`,AddToConvo),
      this.http.post(`${GATEWAY_URL}api/Messaging/InsertAddedToEvents`,AddToEvents)
     );
  }

  public AddConversation(ConvoName:string):Observable<any>{
    return this.http.get(`${GATEWAY_URL}/Messaging/AddConversation/${ConvoName}`);
  }

}

