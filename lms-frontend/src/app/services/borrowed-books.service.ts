import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBooksService {

  private apiUrl = 'http://localhost:8080/api/borrow';

  constructor(private http: HttpClient) {}

  borrowBook(userId: string, bookId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/borrow`, { userId, bookId });
  }

  returnBook(borrowId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return`, borrowId);
  }
}
