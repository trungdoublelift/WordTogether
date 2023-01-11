import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import { DocumentState } from 'src/ngrx/states/document.state';
import { collectionChanges, query, collection, where, Firestore } from '@angular/fire/firestore';
import { Document } from '../../../../models/document.model'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  documentList: Array<Document> = [];
  tempSub!: Subscription;
  loadingDocument: boolean = true;
  constructor(public documentSvc: DocumentService, private auth: Store<{ auth: AuthState }>, private document: Store<{ document: DocumentState }>, private db: Firestore) {
    this.authState.subscribe((data) => {
      if (data.auth) {
        let userDocumentQuery = query(collection(this.db, 'documents'), where('createdBy', '==', data.auth.userId))
        this.tempSub = collectionChanges(userDocumentQuery).subscribe((data) => {
          if (data != null) {
            data.forEach((doc) => {
              if (doc.type === 'added') {
                this.documentList.push(doc.doc.data() as Document);
              }
            })
            this.loadingDocument = false;
          }
        })
      }
    })
  }
  ngOnDestroy(): void {
    try {
      this.tempSub.unsubscribe();
    } catch (err) { }

  }
  documentState = this.document.select('document');
  authState = this.auth.select('auth');
  createDocument() {
    try {
      let temp: Subscription = this.authState.subscribe((data) => {
        if (data.auth?.userId) {
          this.document.dispatch(DocumentActions.createDocument({ userId: data.auth.userId }));
        }
      })
      temp.unsubscribe();
    } catch (err) {

    }
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
}
