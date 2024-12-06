import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowingHistoryService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createBorrowingHistory(borrowingHistoryRecord: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-borrowing-history`, borrowingHistoryRecord, {
      headers: this.getHeaders()});
  }


}
 