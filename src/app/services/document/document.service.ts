import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Document} from '../../models/document.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiURL=`${environment.apiURL}document/`

  constructor(private http:HttpClient) {

   }
  documentList: Array<Document> =[];

  createDocument(userId:string){
    return this.http.post(this.apiURL+'create',{userId:userId}) as Observable<string>;
  }
  // deleteDocument(userId:string,docId:string){
  //   return this.http.delete(this.apiURL+'delete',{userId:userId,docId:docId});
  // }



   saveDocument(docId:string,documentString:string){
     this.http.post(this.apiURL+'save',{docId:docId,content:documentString}).subscribe((data)=>{
      console.log('1');
     });

  }
  readDocument(docId:string){
    this.http.post(this.apiURL+'read',{docId:docId},{responseType:"text"}).subscribe((data)=>{

      console.log('data nè',data);
     });
  };


}
