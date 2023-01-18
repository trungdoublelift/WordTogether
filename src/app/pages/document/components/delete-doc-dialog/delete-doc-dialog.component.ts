import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { DocumentState } from 'src/ngrx/states/document.state';

@Component({
  selector: 'app-delete-doc-dialog',
  templateUrl: './delete-doc-dialog.component.html',
  styleUrls: ['./delete-doc-dialog.component.scss']
})
export class DeleteDocDialogComponent {

  document$ = this.store.select('document');
  constructor(private store: Store<{ document: DocumentState }>,@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  deleteDoc() {
    this.store.dispatch(DocumentActions.deleteDocument({ docId: this.data.docId}))
  }

}
