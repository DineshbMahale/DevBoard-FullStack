import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  if(!authService.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getUserRole();
  const allowedRoles = route.data?.['roles'] ?? [];

  if (allowedRoles.length === 0) {
    return true; // no role restriction 
  } 

  if (role && allowedRoles.includes(role)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};