import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import { DocumentState } from 'src/ngrx/states/document.state';
import { collectionChanges, query, collection, where, Firestore } from '@angular/fire/firestore';
import { Document } from '../../../../models/document.model'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from '../add-document/add-document.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  documentList: Array<Document> = [];

  tempSub!: Subscription;
  loadingDocument: boolean = true;
  documentState = this.store.select('document');
  authState = this.store.select('auth');
  constructor(public documentSvc: DocumentService, private store: Store<{ auth: AuthState,document:DocumentState}>,
     private db: Firestore,private route:Router,private dialog:MatDialog) {

    this.authState.subscribe((data) => {
      if (data.auth) {
        let userDocumentQuery = query(collection(this.db, 'documents'), where('createdBy', '==', data.auth.userId))
        this.tempSub = collectionChanges(userDocumentQuery).subscribe((data) => {
          if (data != null) {
            this.documentList = data.filter((doc) => doc.doc.data()['hide'] == false).map((doc) => {return doc.doc.data() as Document})
            this.loadingDocument = false;
          }
          if(data.length==0){
            this.loadingDocument = false;
            this.documentList = [];
          }

        })
      }
    })
  }
  ngOnDestroy(): void {
    try {
      this.tempSub.unsubscribe();
      this.documentList = [];
    } catch (err) { }

  }


  getDate(timeStamp: any): string {
    let date = new Date(parseInt(timeStamp))
    let hoursFormat = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutesFormat = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let dayFormat = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthFormat = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let dateStr = hoursFormat + ":" + minutesFormat + " " + dayFormat + "/" + monthFormat + "/" + date.getFullYear();
    return dateStr
  }
  navigateToDocument(docId:string){
    this.route.navigate(['view/edit/',docId]);
  }
  openDialog(){
    this.dialog.open(AddDocumentComponent)
  }
  updateDocStatus(docId:string){
    this.store.dispatch(DocumentActions.updateDocStatus({docId:docId,docStatus:true}))
  }
}
