import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardServiceService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getBorrowingHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/borrowing-history`, {
      headers: this.getHeaders()});
  }

  getTotalBorrowedBooks(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/total-borrowed-books`, {
      headers: this.getHeaders()});
  }

  getTotalPenaltiesPaid(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/total-penalties`, {
      headers: this.getHeaders()});
  }
}
