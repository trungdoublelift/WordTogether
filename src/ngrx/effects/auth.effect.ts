import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, mergeMap, EMPTY, from } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '../actions/auth.action';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authSvc: AuthService,private route:Router,private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string,success:boolean) {
    if(success){
      this._snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }else{
      this._snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    }

  }
  loginWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() => {
        return from(this.authSvc.loginWithGoogle()).pipe(
          map((auth) => {
            this.route.navigate(['/document/document'])
            this.openSnackBar('Đăng nhập thành công','Đóng',true);
            return AuthActions.loginWithGoogleSuccess({ auth: auth });
          }),
          catchError((error)=>{
            this.openSnackBar('Đăng nhập thất bại','Đóng',false);
            return of(AuthActions.loginWithGoogleFailure({error:error}));
          })
        )
      })
    )
  })
}
