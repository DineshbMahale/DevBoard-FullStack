import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication-service';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isUserLoggedIn) { // ✅ FIXED
    router.navigate(['/signin']);
    return false;
  }

  const role = authService.getUserRole();
  const allowedRoles = route.data?.['roles'] ?? [];

  if (allowedRoles.length === 0) {
    return true;
  }

  if (role && allowedRoles.includes(role)) {
    return true;
  }

  router.navigate(['/signin']);
  return false;
};