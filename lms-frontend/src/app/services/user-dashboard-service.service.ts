import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardServiceService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getBorrowingHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/borrowing-history`);
  }

  getTotalBorrowedBooks(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/total-borrowed-books`);
  }

  getTotalPenaltiesPaid(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/total-penalties`);
  }
}
