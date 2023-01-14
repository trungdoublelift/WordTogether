import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Document} from '../../models/document.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiURL=`${environment.apiURL}document/`
  socket:any
  socketURL='http://localhost:3000';
  constructor(private http:HttpClient) {
    //create socket connection
    this.socket=io(this.socketURL);
   }
  documentList: Array<Document> =[];

  createDocument(userId:string){
    return this.http.post(this.apiURL+'create',{userId:userId}) as Observable<string>;
  }
  // deleteDocument(userId:string,docId:string){
  //   return this.http.delete(this.apiURL+'delete',{userId:userId,docId:docId});
  // }

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        console.log(data)
        subscriber.next(data);
      })
    })
  };
  emit(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }

}
