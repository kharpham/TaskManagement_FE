// src/app/shared/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7090/api/task';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTasks(isComplete?: boolean): Observable<any[]> {
    let url = this.apiUrl;
    if (isComplete !== undefined) {
      url += `?isComplete=${isComplete}`;
    }
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTaskStatus(id: number, status: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, status, { headers: this.getAuthHeaders() });
  }
}