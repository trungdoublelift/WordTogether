import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, mergeMap, EMPTY, from } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authSvc: AuthService,private route:Router) { }
  loginWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      switchMap(() => {
        return from(this.authSvc.loginWithGoogle()).pipe(
          map((auth) => {
            this.route.navigate(['/document/document'])

            return AuthActions.loginWithGoogleSuccess({ auth: auth });
          }),
          catchError((error)=>{

            return of(AuthActions.loginWithGoogleFailure({error:error}));
          })
        )
      })
    )
  })
}
