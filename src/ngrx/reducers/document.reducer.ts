import { createReducer, on } from "@ngrx/store";
import { DocumentActions } from "../actions/document.action";
import { DocumentState } from "../states/document.state";

const initialState: DocumentState = {
  document:null,
  documentString:'',
  documents:[],
  loading:false,
  inProcess:false,
  error:'',


}
export const documentReducer = createReducer(
  initialState,
  on(DocumentActions.createDocument, (state) => {
    return {
      ...state,
      inProcess: true,
      error:'',
    }
  }),
  on(DocumentActions.createDocumentSuccess, (state, { docId }) => {
    return {
      ...state,
      inProcess: false,
    }
  }),
  on(DocumentActions.createDocumentFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    }
  }),
  on(DocumentActions.deleteDocument, (state) => {
    return {
      ...state,
      inProcess: true,
      error:'',
    }
  }),
  on(DocumentActions.deleteDocumentSuccess, (state) => {
    return {
      ...state,
      inProcess: false,
    }
  }),
  on(DocumentActions.deleteDocumentFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    }
  }),
  on(DocumentActions.saveDocument, (state) => {
    return {
      ...state,
      inProcess: true,
      error:'',
    }
  }),
  on(DocumentActions.saveDocumentSuccess, (state) => {
    return {
      ...state,
      inProcess: false,
    }
  }),
  on(DocumentActions.saveDocumentFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    }
  }),
  on(DocumentActions.readDocment, (state) => {
    return {
      ...state,
      documentString:'',
      inProcess: true,
      error:'',
    }
  }),
  on(DocumentActions.readDocumentSuccess, (state, { documentString }) => {
    return {
      ...state,
      documentString:documentString,
      inProcess: false,
    }
  }),
  on(DocumentActions.readDocumentFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    }
  }),
  on(DocumentActions.updateDocStatus, (state) => {
    return {
      ...state,
      inProcess: true,
      error:'',
    }
  }),
  on(DocumentActions.updateDocStatusSuccess, (state) => {
    return {
      ...state,
      inProcess: false,
    }
  }),
  on(DocumentActions.updateDocStatusFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      error: error,
    }
  })


)
