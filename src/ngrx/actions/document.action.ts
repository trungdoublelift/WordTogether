import { createAction, props } from '@ngrx/store';
import { Document } from 'src/app/models/document.model';

export const DocumentActions={
  createDocument:createAction('[Document] Create New Document',props<{userId:string}>()),
  createDocumentSuccess:createAction('[Document] Create New Document Success',props<{docId:string}>()),
  createDocumentFailure:createAction('[Document] Create New Document Failure',props<{error:string}>()),

  deleteDocument:createAction('[Document] Delete Document',props<{userId:string,docId:string}>()),
  deleteDocumentSuccess:createAction('[Document] Delete Document Success'),
  deleteDocumentFailure:createAction('[Document] Delete Document Failure',props<{error:string}>()),
}
