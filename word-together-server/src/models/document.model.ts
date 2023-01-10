/* eslint-disable prettier/prettier */
export interface Document {
  docId:string,
  name:string,
  createDate:string,
  modifiedDate:string,
  editRight:string[],
  seenRight:string[],
  type:string,
  createdBy:string,
}
