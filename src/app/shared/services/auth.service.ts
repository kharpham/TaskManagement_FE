// src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7090/api/user';
  private loggedIn = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        // this.cookieService.set('jwt', response.token, 7, '/', '', true, 'Strict'); // Manually set the token in cookies
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
        console.log('AuthService: Logout successful, setting loggedIn to false');
        this.loggedIn = false;
        return response;
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('jwt');
    console.log('AuthService: Checking if JWT token exists in cookies:', token);
    if (token) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  getUserInfo(): Observable<any> {
    const token = this.cookieService.get('jwt');
    return this.http.get(`${this.apiUrl}/userinfo`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
}