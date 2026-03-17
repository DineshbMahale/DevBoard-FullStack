import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userName: string = '';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  public get isUserLoggedIn(): boolean {
    return !!(localStorage.getItem('authToken'));
  }

  public get userDetails(): any {
    return (localStorage.getItem('authToken') || null);
  }

  public signIn(username: string, password: string) {
   return this.http.post(`${environment.nodeUri}/signin`, { username, password }, { headers: this.headers });
  }

  public signUp(firstName: string, lastName: string, email: string, password: string, roles: any[]) {
    return this.http.post(`${environment.nodeUri}/signup`, { firstName, lastName, email, password, roles }, { headers: this.headers });
  }

  public saveToken(token: string, role: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
  }

  public logOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/signin']);
  }
} 