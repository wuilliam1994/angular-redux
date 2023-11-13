import { createReducer, on } from '@ngrx/store';
import { loginAction } from './auth.actions';
// import {  } from "src/app/auth/services/auth.service";
import { initialAuthState } from "src/app/store/auth/auth.state";

export const authReducer = createReducer(
    initialAuthState,
  on(loginAction, (state) => ({
    ...state,
    errorMessage: null,
  })),
//   on(loginSuccess, (state, { user }) => ({
//     ...state,
//     user,
//     isLoggedIn: true,
//     errorMessage: null,
//   })),
//   on(loginFailure, (state, { errorMessage }) => ({
//     ...state,
//     errorMessage,
//   })),
//   on(register, (state) => ({
//     ...state,
//     errorMessage: null,
//   })),
//   on(registerSuccess, (state, { user }) => ({
//     ...state,
//     user,
//     isLoggedIn: true,
//     errorMessage: null,
//   })),
//   on(registerFailure, (state, { errorMessage }) => ({
//     ...state,
//     errorMessage,
//   })),
//   on(logout, () => initialAuthState)
);