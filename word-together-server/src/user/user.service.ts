/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { getFirestore } from 'firebase-admin/firestore';

import * as firebase from 'firebase-admin'
import { Account } from 'src/models/user.model';
@Injectable()
export class UserService {
  db = getFirestore();

  async createUserProfile(user: Account) {
    try {
      console.log(user);
      // check if user already exist
      const doc= (await this.db.collection('users').doc(user.userId).get());
      if(doc.exists){
        return { success: false, error: "User already exist"}
      }else{
        await this.db.collection('users').doc(user.userId).set(user);
        return { success: true}
      }
    } catch (err) {
      return { success: false,error:err }
    }

  }
}
