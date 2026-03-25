import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  email: string = '';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  public get isUserLoggedIn(): boolean {
    return !!(localStorage.getItem('authToken'));
  }

  public get userDetails(): any {
    return (localStorage.getItem('authToken'));
  }

  public getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  public signIn(email: string, password: string) {
   return this.http.post(`${environment.nodeUri}/auth/login`, { email, password }, { headers: this.headers });
  }

  public signUp(firstName: string, lastName: string, email: string, userName: string, password: string, role: string) {
    return this.http.post(`${environment.nodeUri}/auth/register`, { firstName, lastName, email, userName, password, role }, { headers: this.headers });
  }


  public saveToken(token: string) {
  localStorage.setItem('authToken', token);

  const decoded: any = jwtDecode(token);
  const role = decoded['role'] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userName = decoded['Name'] || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  localStorage.setItem('userRole', role);
  localStorage.setItem('userName', userName);
}



  public logOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/signin']);
  }
} 