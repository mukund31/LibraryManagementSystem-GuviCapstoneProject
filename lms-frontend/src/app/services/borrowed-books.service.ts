import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBooksService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getBorrowHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  borrowBook(userId: string, bookId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userId', userId);
    params.set('bookId', bookId);
  
    return this.http.post(`${this.apiUrl}/borrow`, params.toString(), {
      headers: this.getBorrowHeaders(),
      responseType: 'text' as 'json'
    });
  }
  // borrowBook(userId: string, bookId: string): Observable<any> {
  //   const params = new URLSearchParams();
  //   params.set('userId', userId);
  //   params.set('bookId', bookId);
  
  //   return this.http.post(`${this.apiUrl}/borrow`, params.toString(), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     responseType: 'text' as 'json'
  //   });
  // }

  returnBook(borrowId: string): Observable<any> {
    const body = { borrowId };
    return this.http.post(`${this.apiUrl}/return`, body, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

  getCheckedOutBooksCount(): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/checked-out-books-count`, {
      headers: this.getHeaders()});
  }

  getOverdueBooksCount(): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/overdue-books-count`, {
      headers: this.getHeaders()});
  }
}
