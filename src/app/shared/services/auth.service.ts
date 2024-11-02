// src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7090/api/user';
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        this.loggedIn = true;
        return response;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      map(response => {
        this.loggedIn = false;
        return response;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    if (this.loggedIn) {
      return of(true);
    }

    return this.http.get(`${this.apiUrl}/verify`).pipe(
      map(() => {
        this.loggedIn = true;
        return true;
      }),
      catchError(() => {
        this.loggedIn = false;
        return of(false);
      })
    );
  }
}