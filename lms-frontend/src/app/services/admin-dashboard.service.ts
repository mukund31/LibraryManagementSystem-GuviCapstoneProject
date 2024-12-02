import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {

  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getOverdueBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/overdue-books`, {
      headers: this.getHeaders()});
  }

  getTopPerformingBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-performing-books`, {
      headers: this.getHeaders()});
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, {
      headers: this.getHeaders()});
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-count`, {
      headers: this.getHeaders()});
  }
}
