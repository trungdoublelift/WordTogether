import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signInWithPopup, GoogleAuthProvider, Auth, authState, signOut, User } from '@angular/fire/auth'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthActions } from 'src/ngrx/actions/auth.action';
import { AuthState } from 'src/ngrx/states/auth.state';
import {Account} from '../models/account.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string=`${environment.apiURL}user/`;
  currentUser!:Account
  constructor(private auth: Auth,private authStore:Store<{auth:AuthState}>,private http:HttpClient) {
    authState(this.auth).subscribe(user => {
      if(user!=null){
        let account:Account={
          userId: user?.uid,
          email: user?.email,
          userName:user?.displayName,
          photoURL:user?.photoURL

        }
        this.authStore.dispatch(AuthActions.loginWithGoogleSuccess({auth:account}));
      }
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
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await signOut(this.auth);
        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }
  async checkFirstLogin(userId:string){
    return this.http.post(`${this.apiURL}create`,{
      userId:userId
    }) as Observable<{status:string,message:string}>;
  }
}
