import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;
  borrowStatus: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private borrowBookService: BorrowedBooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkAuthentication();

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((data) => {
        this.book = data;
      });
    }
  }

  borrowBook(): void {
    if (this.book?.bookId) {
      const userId = this.authService.getUserId();
      console.log("UserId: " + userId);
  
      if (userId) {
        this.borrowBookService.borrowBook(userId, this.book.bookId).subscribe(
          (response) => {
            this.borrowStatus = response;
            if (this.book) {
              this.book.copiesAvailable--;
            }
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
  
}
