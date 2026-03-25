import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http:HttpClient){}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.nodeUri}/users`).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number) : Observable<void> {
    this.http.delete(`${environment.nodeUri}/users/${userId}`).subscribe({
      next: () => {
        console.log('User deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting user', err);
      }
    });
    return new Observable<void>();
  }

  handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
