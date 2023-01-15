/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { getFirestore } from 'firebase-admin/firestore';
import { Document } from 'src/models/document.model';
import * as firebase from 'firebase-admin'
import "firebase/storage";
@Injectable()
export class DocumentService {
  db = getFirestore();
  getHello(): string {
    return 'Hello World!';
  }
  async createNewDocument(userId: string) {

    const docId = Date.now().toString();
    const doc: Document = {
      docId: docId,
      name: 'New Document',
      createdDate: Date.now().toString(),
      modifiedDate: Date.now().toString(),
      editRight: [],
      type: 'private',
      seenRight: [],
      createdBy: userId,
    }
    try {
      await this.db.collection('documents').doc(docId).set(doc);
      return { success: true, docId: docId }
    } catch (err) {
      return { success: false }
    }
  }
  async deleteDocument(userId: string, docId: string) {
    try {
      const doc = (await this.db.collection('documents').doc(docId).get()).data() as Document;
      if (doc.createdBy === userId) {
        await this.db.collection('documents').doc(docId).delete();
        return { success: true }
      } else {
        return { success: false, error: "Unauthorize" }
      }

    } catch (err) {
      return { success: false, error: err }
    }
  }
  async updateRight(userId: string, docId: string, updateUserId: string, right: string) {
    try {
      const doc = (await this.db.collection('documents').doc(docId).get()).data() as Document;
      if (doc.createdBy === userId) {

        switch (right) {
          case 'edit':
            if (doc.editRight.includes(updateUserId)) {
              return { success: false, error: "User already have edit right" }
            }
            else {
              this.db.collection('documents').doc(docId).update({
                editRight: firebase.firestore.FieldValue.arrayUnion(updateUserId)
              })
              return { success: true }
            }

          case 'seen':
            if (doc.editRight.includes(updateUserId)) {
              return { success: false, error: "User already have edit right" }
            }
            else {
              this.db.collection('documents').doc(docId).update({
                editRight: firebase.firestore.FieldValue.arrayUnion(updateUserId)
              })
              return { success: true }
            }
        }

      } else {
        return { success: false, error: "Unauthorize" }
      }
    } catch (err) {
      return { success: false, error: err }
    }
  }
  async saveDocument(userId: string, docId: string, content: string) {
    const storage = firebase.storage();
    const file = storage.bucket().file(docId);
    await file.save(content);

  }
  async readDocumentReturnString(docId:string){
    try{
      const storage = firebase.storage();
      const file = storage.bucket().file(docId);

      const content = await file.download();
      if(content){
        return content.toString();
      }else{
        return null;
      }
    }catch(err){
      console.log(err);
    }

  }

}
