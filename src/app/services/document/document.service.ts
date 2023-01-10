import { Injectable } from '@angular/core';
import {Document} from '../../models/document.model'
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }
  documentList: Array<Document> = [
    {
      docId: "1",
      name:"Bản sao của báo cáo thực tập nhận thức",
      createdDate:"31/12/2022",
      modifiedDate:"31/12/2022",
      createdBy:"1"
    },
    {
      docId: "2",
      name:"Bản sao của báo cáo thực tập nhận thức",
      createdDate:"31/12/2022",
      modifiedDate:"31/12/2022",
      createdBy:"1"
    },
    {
      docId: "3",
      name:"Bản sao của báo cáo thực tập nhận thức",
      createdDate:"31/12/2022",
      modifiedDate:"31/12/2022",
      createdBy:"1"
    },
    {
      docId: "4",
      name:"Bản sao của báo cáo thực tập nhận thức",
      createdDate:"31/12/2022",
      modifiedDate:"31/12/2022",
      createdBy:"1"
    },
  ]
}
