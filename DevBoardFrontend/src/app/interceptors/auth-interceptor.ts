import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../auth/authentication-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthenticationService);

  const token = localStorage.getItem('authToken');;

  if(token){
    const cloned = req.clone({
      setHeaders:{
        Authorization : `Bearer ${token}`
      }
    })

    return next(cloned);
  } 
  return next(req);
};
