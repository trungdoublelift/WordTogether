import { createReducer, on } from "@ngrx/store";
import { DocumentActions } from "../actions/document.action";
import { DocumentState } from "../states/document.state";

const initialState: DocumentState = {
  document:null,
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
  })

)
