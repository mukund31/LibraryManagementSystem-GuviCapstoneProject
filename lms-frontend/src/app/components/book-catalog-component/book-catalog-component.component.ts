import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { BorrowedBooksService } from '../../services/borrowed-books.service';

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

  book: Book | undefined;
  borrowStatus: string | undefined;
  reserveStatus: string | undefined;
  selectedBook: Book | null = null;
  isModalOpen: boolean = false;

  constructor(private bookService: BookService,
    private authService: AuthService,
    private borrowBookService: BorrowedBooksService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }
  
  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.noResultsFound = this.books.length === 0;
    });
    // console.log(this.books.map(book => book.coverImageBase64));
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

  openModal(book: Book): void {
    this.selectedBook = book;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedBook = null;
  }

  borrowBook(): void {
    if (this.selectedBook?.bookId) {
      const userId = this.authService.getUserId();
      console.log("UserId: " + userId);
  
      if (userId) {
        this.borrowBookService.borrowBook(userId, this.selectedBook.bookId).subscribe(
          (response) => {
            this.borrowStatus = response;
            if (this.selectedBook) {
              this.selectedBook.copiesAvailable--;
            }
            setTimeout(() => {
              this.borrowStatus = undefined;
            }, 2000);
          },
          (error) => {
            console.error(error);
            this.borrowStatus = 'Failed to borrow the book. Please try again later.';
          }
        );
      } else {
        this.borrowStatus = 'User not authenticated.';
      }
    } else {
      this.borrowStatus = 'Book not found or invalid bookId.';
    }
  }

  reserveBook(): void {
    if (this.selectedBook?.bookId) {
      const userId = this.authService.getUserId();
      console.log("UserId: " + userId);
  
      if (userId) {
        this.borrowBookService.reserveBook(userId, this.selectedBook.bookId).subscribe(
          (response) => {
            this.reserveStatus = "Book Reserved Successfully";
            setTimeout(() => {
              this.borrowStatus = undefined;
            }, 2000);
          },
          (error) => {
            console.error(error);
            this.borrowStatus = 'Failed to reserve the book. Please try again later.';
          }
        );
      } else {
        this.borrowStatus = 'User not authenticated.';
      }
    } else {
      this.borrowStatus = 'Book not found or invalid bookId.';
    }
  }
}
