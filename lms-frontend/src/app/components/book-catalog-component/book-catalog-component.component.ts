import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-catalog-component',
  templateUrl: './book-catalog-component.component.html',
  styleUrls: ['./book-catalog-component.component.scss']
})
export class BookCatalogComponentComponent {
  books: Book[] = [];
  query: string = '';
  noResultsFound: boolean = false;
  
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
      this.noResultsFound = this.books.length === 0;
    });
  }

  searchBooks(): void {
    if (this.query.trim() === '') {
      this.getAllBooks();
    } else {
      this.bookService.searchBooks(this.query).subscribe(data => {
        this.books = data;
        this.noResultsFound = this.books.length === 0;
      });
    }
  }

  addBook(book: Book): void {
    this.bookService.addBook(book).subscribe(data => {
      this.books.push(data);
    });
  }
}
