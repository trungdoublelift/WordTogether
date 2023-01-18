import { createAction, props } from '@ngrx/store';
import { Document } from 'src/app/models/document.model';

export const DocumentActions={
  createDocument:createAction('[Document] Create New Document',props<{userId:string,docName:string}>()),
  createDocumentSuccess:createAction('[Document] Create New Document Success',props<{docId:string}>()),
  createDocumentFailure:createAction('[Document] Create New Document Failure',props<{error:string}>()),

  deleteDocument:createAction('[Document] Delete Document',props<{userId:string,docId:string}>()),
  deleteDocumentSuccess:createAction('[Document] Delete Document Success'),
  deleteDocumentFailure:createAction('[Document] Delete Document Failure',props<{error:string}>()),

  saveDocument:createAction('[Document] Save Document',props<{docId:string,documentString:string}>()),
  saveDocumentSuccess:createAction('[Document] Save Document Success'),
  saveDocumentFailure:createAction('[Document] Save Document Failure',props<{error:string}>()),

  updateDocStatus:createAction('[Document] Update Document Status',props<{docId:string,docStatus:boolean}>()),
  updateDocStatusSuccess:createAction('[Document] Update Document Status Success'),
  updateDocStatusFailure:createAction('[Document] Update Document Status Failure',props<{error:string}>()),


  readDocment:createAction('[Document] Read Document',props<{docId:string}>()),
  readDocumentSuccess:createAction('[Document] Read Document Success',props<{documentString:string}>()),
  readDocumentFailure:createAction('[Document] Read Document Failure',props<{error:string}>()),
}
