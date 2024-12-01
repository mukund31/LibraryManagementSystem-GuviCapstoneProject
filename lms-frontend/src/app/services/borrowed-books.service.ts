import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBooksService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  borrowBook(userId: string, bookId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userId', userId);
    params.set('bookId', bookId);
  
    return this.http.post(`${this.apiUrl}/borrow`, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text' as 'json'
    });
  }

  returnBook(borrowId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return`, borrowId);
  }
}
