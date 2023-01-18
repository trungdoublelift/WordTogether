import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Document } from '../../models/document.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firestore, getDoc, collection, docData, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiURL = `${environment.apiURL}document/`

  constructor(private http: HttpClient, private fs: Firestore) {

  }
  documentList: Array<Document> = [];

  createDocument(userId: string,docName:string) {
    return this.http.post(this.apiURL + 'create', { userId: userId,docName:docName }) as Observable<string>;
  }
  deleteDocument(userId:string,docId:string){
    // return this.http.delete(this.apiURL+'delete',{userId:userId,docId:docId});
  }
  updateDocStatus(docId:string,status:boolean){
    return this.http.put(this.apiURL+'updateStatus',{docId:docId,status:status}) as Observable<any>;
  }
  saveDocument(docId: string, documentString: string) {
    return this.http.post(this.apiURL + 'save', { docId: docId, content: documentString }) as Observable<any>;
  }
  readDocument(docId: string) {
   return this.http.post(this.apiURL + 'read', { docId: docId }, { responseType: "text" }) as Observable<string>;
  };
  getDocument(docId: string) {
    let colRef = collection(this.fs, 'documents');
    return docData(doc(colRef, docId)) as Observable<Document>;

  }


}
