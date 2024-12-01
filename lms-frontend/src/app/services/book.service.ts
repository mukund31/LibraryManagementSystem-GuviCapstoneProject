import { HttpClient, HttpParams } from '@angular/common/http';
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
    console.log(book);
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }
  
  searchBooks(query?: string, searchTypes: boolean[] = [true, true, true]): Observable<Book[]> {
    let params = new HttpParams();

    if (query) {
        params = params.set('query', query);
    }

    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params }).pipe(
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
    let countB=this.http.get<number>(`${this.apiUrl}/count`);
    console.log("count books: "+countB);
    return countB;
  }

  getTotalUniqueBooksCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unique-count`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }

  updateBook(bookId: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${bookId}`, book);
  }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookId}`);
  }
  
}
