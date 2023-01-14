import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/models/account.model';

export const AuthActions={
  loginWithGoogle:createAction('[Auth] Login With Google'),
  loginWithGoogleSuccess:createAction('[Auth] Login With Google Success',props<{auth:Account}>()),
  loginWithGoogleFailure:createAction('[Auth] Login With Google Failure',props<{error:string}>()),
  googleLogout:createAction('[Auth] Google Logout'),
  googleLogoutSuccess:createAction('[Auth] Google Lougout Success'),
  googleLogoutFailure:createAction('[Auth] Google Logout Failure',props<{error:string}>()),
  getUserInfo:createAction('[Auth] Get User Info',props<{userId:string}>()),
  getUserInfoSuccess:createAction('[Auth] Get User Info Success',props<{auth:Account}>()),
  getUserInfoFailure:createAction('[Auth] Get User Info Failure',props<{error:string}>()),
  createUserProfile:createAction('[Auth] Create User Profile',props<{auth:Account}>()),
  createUserProfileSuccess:createAction('[Auth] Create User Profile Success'),
  createUserProfileFailure:createAction('[Auth] Create User Profile Failure',props<{error:string}>()),
}
