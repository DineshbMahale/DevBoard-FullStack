import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../models/login.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5214/api/auth/login";

  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<any> {

    return this.http.post(this.apiUrl, data);

  }

  saveToken(token: string, role: string) {
    localStorage.setItem("token", token);
    
  }

  getToken() {

    return localStorage.getItem("token");

  }

  logout(){

    localStorage.removeItem("token");

  }

  isLoggedIn(){

    return !!localStorage.getItem("token");

  }

  getUserRole() : string | null {
    const token = this.getToken();

    if(!token) return null;
    const decoded : any = jwtDecode(token);

    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
}