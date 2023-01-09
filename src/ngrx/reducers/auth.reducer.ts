import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions/auth.action";
import { AuthState } from "../states/auth.state";

const initialState: AuthState = {
  auth: null,
  loading: false,
  error: '',
}
export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginWithGoogle, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AuthActions.loginWithGoogleSuccess, (state, { auth }) => {
    return {
      auth: auth,
      loading: false,
      error: '',
    }
  }),
  on(AuthActions.loginWithGoogleFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    }
  }),
  on(AuthActions.googleLogout, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(AuthActions.googleLogoutSuccess, (state) => {
    return {
      auth: null,
      loading: false,
      error: '',
    }
  }),
  on(AuthActions.googleLogoutFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    }
  }),
)
