import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = "http://localhost:5214/api/users";

  constructor(private http:HttpClient){}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any)
  {
    console.log('API Error : ', error);
    return throwError(() => new Error("Failed to fetch users"));
  }
}
