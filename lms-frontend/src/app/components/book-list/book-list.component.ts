import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchQuery: string = '';

  page: number = 0;
  size: number = 10;
  loading: boolean = false;
  hasMore: boolean = true;

  constructor(private bookService: BookService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;

    this.bookService.loadBooks(this.page, this.size).subscribe({
      next: (response) => {
        this.books = [...this.books, ...response.content];
        this.hasMore = !response.last;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loading = false;
      },
    });

    
    // this.bookService.getAllBooks().subscribe(
    //   (books: Book[]) => {
    //     this.books = books; 
    //   },
    //   (error) => {
    //     console.error('Error fetching books:', error);
    //   }
    // );
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    
    if (atBottom && !this.loading && this.hasMore) {
      // setTimeout(() => {
        this.fetchBooks();
      // }, 300);
    }
  }

  onSearch(): void {
    this.bookService.searchBooks(this.searchQuery, this.authService.getUserId() || "").subscribe(
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

  onDelete(book: Book): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(book.bookId || "").subscribe(
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
