import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    // console.log(book);
    return this.http.post<Book>(`${this.apiUrl}/add`, book, {
      headers: this.getHeaders()});
  }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  searchBooks(query: string, userId: string, searchTypes: boolean[] = [true, true, true]): Observable<Book[]> {
    const requestBody = {
      searchQuery: query,
      userId: userId,
      inTitle: searchTypes[0],
      inAuthor: searchTypes[1],
      inGenre: searchTypes[2],
    };
  
    return this.http.post<Book[]>(`${this.apiUrl}/search`, requestBody, {
      headers: this.getHeaders()
    }).pipe(
      map((books: Book[]) => {
        if (searchTypes.length > 0 && query) {
          return books.filter(book => {
            return searchTypes.some((searchType, index) => {
              if (searchTypes[index]) {
                switch (index) {
                  case 0: // Title
                    return book.title?.toLowerCase().includes(query.toLowerCase());
                  case 1: // Author
                    return book.author?.toLowerCase().includes(query.toLowerCase());
                  case 2: // Genre
                    return book.genre?.toLowerCase().includes(query.toLowerCase());
                  default:
                    return false;
                }
              }
              return false;
            });
          });
        }

        return books;
      })
    );
  }

  getTotalBooksCount(): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/count`, {
      headers: this.getHeaders()});
  }

  getTotalUniqueBooksCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unique-count`, {
      headers: this.getHeaders()});
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, {
      headers: this.getHeaders()});
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`, {
      headers: this.getHeaders()});
  }

  updateBook(bookId: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${bookId}`, book, {
      headers: this.getHeaders()});
  }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookId}`, {
      headers: this.getHeaders()});
  }
  
}
