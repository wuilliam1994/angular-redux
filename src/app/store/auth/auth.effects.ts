import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  loginAction,
  loginSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ credentials }) =>
        this.authService.login(credentials.email, credentials.password).pipe(
          tap((user) => console.log(user)),
          map((user) => loginSuccess({ user })),
          catchError((error) => of(console.log(error)))
        )
      )
    )
  );

//   register$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(register),
//       switchMap(({ user }) =>
//         this.authService.register(user).pipe(
//           map((user) => registerSuccess({ user })),
//           catchError((error) => of(registerFailure({ errorMessage: error })))
//         )
//       )
//     )
//   );
}