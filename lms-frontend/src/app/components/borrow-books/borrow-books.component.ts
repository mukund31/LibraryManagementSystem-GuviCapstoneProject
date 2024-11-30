import { Component } from '@angular/core';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrl: './borrow-books.component.scss'
})
export class BorrowBooksComponent {
  books: any[] = [];
  userId: string = 'someUserId';  // Replace with actual logged-in user ID

  constructor(
    private bookService: BookService,
    private borrowedBooksService: BorrowedBooksService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data: any[]) => {
      this.books = data;
    });
  }

  borrowBook(bookId: string): void {
    this.borrowedBooksService.borrowBook(this.userId, bookId).subscribe(response => {
      alert('Book borrowed successfully!');
      this.ngOnInit();  // Refresh the book list
    }, error => {
      alert('Error: ' + error.message);
    });
  }

  returnBook(borrowId: string): void {
    this.borrowedBooksService.returnBook(borrowId).subscribe(response => {
      alert('Book returned successfully!');
      this.ngOnInit();  // Refresh the book list
    }, error => {
      alert('Error: ' + error.message);
    });
  }
}
