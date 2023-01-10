/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { getFirestore } from 'firebase-admin/firestore';
import { Document } from 'src/models/document.model';
import * as firebase from 'firebase-admin'
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
      createDate: Date.now().toString(),
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
}
