import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-catalog-component',
  templateUrl: './book-catalog-component.component.html',
  styleUrls: ['./book-catalog-component.component.scss']
})
export class BookCatalogComponentComponent {
  books: Book[] = [];
  searchQuery: string = '';
  searchTypes: boolean[] = [true, true, true]; // title, author, genere
  noResultsFound: boolean = false;

  constructor(private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.noResultsFound = this.books.length === 0;
    });
  }

  searchBooks(): void {
    if (this.searchQuery.trim() === '') {
      this.getAllBooks();
    } else {
      this.bookService.searchBooks(this.searchQuery, this.authService.getUserId() || "", this.searchTypes).subscribe((data) => {
        this.books = data;
        this.noResultsFound = this.books.length === 0;
      });
    }
  }
}
