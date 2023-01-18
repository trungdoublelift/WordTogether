import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthActions } from 'src/ngrx/actions/auth.action';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import { DocumentState } from 'src/ngrx/states/document.state';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  value:any='';
  document$ = this.store.select('document');
  auth$ = this.store.select('auth');
    constructor(
    private store:Store<{auth:AuthState,document:DocumentState}>,private snackBar:MatSnackBar) {

    }
    createDocument() {
      try {
        let temp: Subscription = this.store.select('auth').subscribe((data) => {
          if (data.auth?.userId) {
            if(this.value==''){
              this.snackBar.open('Tên tài liệu không được để trống','Đóng',{duration:3000})
              return;
            }
            this.store.dispatch(DocumentActions.createDocument({ userId: data.auth.userId, docName: this.value }));
          }
        })
        temp.unsubscribe();
      } catch (err) {

      }
    }

}

