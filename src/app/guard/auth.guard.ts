import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, state) => {

  const authService = inject(AuthService);

  return authService.getAuthToken();
};
