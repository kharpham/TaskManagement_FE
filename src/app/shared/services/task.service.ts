import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7090/api/task'; // Update this URL as needed

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getTasks(isComplete?: boolean): Observable<any[]> {
    const token = this.cookieService.get('jwt');
    let url = this.apiUrl;
    if (isComplete !== undefined) {
      url += `?isComplete=${isComplete}`;
    }
    return this.http.get<any[]>(url, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`);
    });
  }
  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }

  updateTaskStatus(id: number, taskStatus: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, taskStatus);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}