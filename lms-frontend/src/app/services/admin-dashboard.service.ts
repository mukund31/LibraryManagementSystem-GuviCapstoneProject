import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {

  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getOverdueBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/overdue-books`);
  }

  getTopPerformingBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-performing-books`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-count`);
  }
}
