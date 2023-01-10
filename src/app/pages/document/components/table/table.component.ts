import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentActions } from 'src/ngrx/actions/document.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import { DocumentState } from 'src/ngrx/states/document.state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor(public documentSvc:DocumentService, private auth:Store<{auth:AuthState}>,private document:Store<{document:DocumentState}>) { }
  documentState=this.document.select('document');
  authState=this.auth.select('auth');
  createDocument(){
    try{
      let temp:Subscription=this.authState.subscribe((data)=>{
        if(data.auth?.userId){
          this.document.dispatch(DocumentActions.createDocument({userId:data.auth.userId}));
        }
      })
      temp.unsubscribe();
    }catch(err){

    }
  }
}
