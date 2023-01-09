import { Injectable } from '@angular/core';
import { signInWithPopup, GoogleAuthProvider, Auth, authState, signOut } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import {Account} from '../models/account.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {
    authState(this.auth).subscribe(user => {
      console.log(user);
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return new Promise<Account>(async (resolve, reject) => {
      try {
        let result = await signInWithPopup(this.auth, provider)
        if (result) {
          let account:Account={
            userId: result.user?.uid,
            email: result.user?.email,
            userName:result.user?.displayName,
            photoURL:result.user?.photoURL

          }
          resolve(account);
        }
      } catch (err) {
        reject(null);
      }
    })
  }
  async googleLogout() {
    await this.auth.signOut();
  }
}
