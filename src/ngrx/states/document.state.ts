
import {Document} from '../../app/models/document.model'
export interface DocumentState{
  document:Document|null,
  documents:Array<Document>|null,
  loading:boolean,
  inProcess:boolean,
  error:string,
}
