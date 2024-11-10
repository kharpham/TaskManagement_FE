// src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7090/api/user';
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      map((response: any) => {
        this.loggedIn = true;
        return response;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(response => {
        this.loggedIn = false;
        return response;
      })
    );
  }

  isLoggedIn(): boolean {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (token) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userinfo`, { withCredentials: true });
  }
}