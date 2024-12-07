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

  isAddBookModalOpen: boolean = false;

  page: number = 0;
  size: number = 10;
  loading: boolean = false;
  hasMore: boolean = true;

  book: Book = {
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    isbn: '',
    copiesAvailable: 1,
    location: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
          this.books = this.books.filter(b => b.bookId !== book.bookId);
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }


  openAddBookModal(): void {
    this.isAddBookModalOpen = true;
  }

  closeAddBookModal(): void {
    this.isAddBookModalOpen = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.book.coverImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        this.successMessage = 'Book added successfully!';
        this.books.push(response);
        this.book = {
          title: '',
          author: '',
          genre: '',
          publicationYear: new Date().getFullYear(),
          isbn: '',
          copiesAvailable: 1,
          location: '',
          coverImageBase64: ''
        };
        setTimeout(() => {
          this.successMessage = null;
          this.closeAddBookModal();
        }, 1000);
      },
      (error) => {
        console.error('Error adding book:', error);
        this.errorMessage = 'Error adding book.';
        this.successMessage = null;
      }
    );
  }
}
