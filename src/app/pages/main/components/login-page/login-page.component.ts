import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/ngrx/actions/auth.action';
import { AuthState } from 'src/ngrx/states/auth.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private store:Store<{auth:AuthState}>){

  }
  loginState=this.store.select('auth');
  login(){
    this.store.dispatch(AuthActions.loginWithGoogle());
  }
}
