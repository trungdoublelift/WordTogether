import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import { DocumentState } from 'src/ngrx/states/document.state';
import { collectionChanges,collectionData, query, collection, where, Firestore, DocumentChange } from '@angular/fire/firestore';
import { Document } from '../../../../models/document.model'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { DeleteDocDialogComponent } from '../delete-doc-dialog/delete-doc-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  documentList: Array<Document> = [];

  tempSub!: Subscription;
  loadingDocument: boolean = false;
  documentState = this.store.select('document');
  authState = this.store.select('auth');
  type: string = "";
  constructor(public documentSvc: DocumentService, private store: Store<{ auth: AuthState, document: DocumentState }>,
    private db: Firestore, private route: Router, private dialog: MatDialog, private acRoute: ActivatedRoute) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;

    this.authState.subscribe((data) => {
      if (data.auth) {
        this.type = this.acRoute.snapshot.params['type'];
        this.tempSub = this.getDocuments(data.auth, this.type)!.subscribe((data) => {

          this.loadingDocument = true;
          this.documentList = data.map((doc: any) => { return doc as Document })
          this.loadingDocument = false;
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
  navigateToDocument(docId: string) {
    this.route.navigate(['view/edit/', docId]);
  }
  openDialog() {
    this.dialog.open(AddDocumentComponent)
  }
  updateDocStatus(docId: string) {
    this.store.dispatch(DocumentActions.updateDocStatus({ docId: docId, docStatus: true }))
  }
  recoverDoc(docId: string) {
    this.store.dispatch(DocumentActions.updateDocStatus({ docId: docId, docStatus: false }))
  }
  getDocuments(auth: any, type: string) {
    switch (type) {
      case 'delete':
        let deletedQuery = query(collection(this.db, 'documents'), where('createdBy', '==', auth.userId), where('hide', '==', true))
        return collectionData(deletedQuery) as Observable<DocumentChange<Document>[]>;

      case 'all':
        let allDocumentQuery = query(collection(this.db, 'documents'), where('createdBy', '==', auth.userId), where('hide', '==', false))
        return collectionData(allDocumentQuery) as Observable<DocumentChange<Document>[]>
      default:
        return
    }
  }
  removeDoc(docId: string) {
    this.dialog.open(DeleteDocDialogComponent, {
      data: {
        docId: docId
      }
    })
  }
}
