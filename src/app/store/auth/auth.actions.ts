import { createAction, props } from '@ngrx/store';
import { AuthResponce } from "src/app/auth/interfaces/auth.interface";
import { User } from "src/app/auth/interfaces/user.interface";
import { Credentials } from 'src/app/interfaces/credentials';
// import { User } from '../models/user.model';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ credentials: Credentials }>()
);

// export const login = createAction(
//     '[Auth] Login',
//     props<{ credentials: Credentials }>()
//   );

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authResponce: AuthResponce }>()
);

// export const loginFailure = createAction(
//   '[Auth] Login Failure',
//   props<{ errorMessage: string }>()
// );

// export const register = createAction(
//   '[Auth] Register',
//   props<{ user: User }>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ user: User }>()
// );

// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{ errorMessage: string }>()
// );

// export const logout = createAction('[Auth] Logout');