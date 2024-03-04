import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  console.log(route);

  return authService.getAuthToken();
};


export const hasRole = (roles: string[]) => {
  return () =>
  inject(AuthService).getRoleUser().pipe(
    map((user) => Boolean(user && roles.includes(user.role[0]))),
    tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
  );
};
