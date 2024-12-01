import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchQuery: string = '';

  constructor(private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onSearch(): void {
    this.bookService.searchBooks(this.searchQuery).subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error searching books:', error);
      }
    );
  }

  onEdit(book: Book): void {
    this.router.navigate(['/edit-book', book.bookId]);
  }

  onDelete(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          this.fetchBooks();
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
}
