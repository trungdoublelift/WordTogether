import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, mergeMap, EMPTY, from } from 'rxjs';


import {DocumentService} from '../../app/services/document/document.service'
import { DocumentActions } from '../actions/document.action';
@Injectable()
export class DocumentEffects {
  constructor(private actions$: Actions, private documentSvc:DocumentService,private route:Router) { }

  createDocument$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(DocumentActions.createDocument),
      switchMap((action)=>{
        return from(this.documentSvc.createDocument(action.userId)).pipe(
          map((result:any)=>{

            this.route.navigate([`/view/edit/${result.docId}`]);
            return DocumentActions.createDocumentSuccess({docId:result.docId});
          }),
          catchError((error)=>{

            return of(DocumentActions.createDocumentFailure({error:error}));
          })
        )
      })
    )
  })
}
