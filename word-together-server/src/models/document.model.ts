/* eslint-disable prettier/prettier */
export interface Document {
  docId:string,
  name:string,
  createdDate:string,
  modifiedDate:string,
  editRight:string[],
  seenRight:string[],
  type:string,
  createdBy:string,
}
