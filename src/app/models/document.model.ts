export interface Document{
  docId:string,
  name:string,
  createdDate:string,
  modifiedDate:string,
  editRight:Array<string>,
  seenRight:Array<string>,
  type:string,
  createdBy:string,
}
