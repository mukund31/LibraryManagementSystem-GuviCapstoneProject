import { Component } from '@angular/core';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-borrower-list',
  templateUrl: './borrower-list.component.html',
  styleUrl: './borrower-list.component.scss'
})
export class BorrowerListComponent {
  borrowedBooks: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private borrowedBooksService: BorrowedBooksService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    this.borrowedBooksService.getBorrowedBooks().subscribe(
      (data) => {
        console.log(data);
        
        data.forEach((book: any) => {
          this.userService.getUserById(book.userId).subscribe(
            (user) => {
              this.borrowedBooks.push({
                ...book,
                username: user.username
              });
            },
            (error) => {
              console.error('Error fetching user details:', error);
              this.errorMessage = 'Unable to load user details for borrowed books.';
            }
          );
        });
      },
      (error) => {
        console.error('Error loading borrowed books:', error);
        this.errorMessage = 'Unable to load borrowed books.';
      }
    );
  }

  notify(book: any): void {
    console.log(book);
    this.borrowedBooksService.notifyBorrower(book).subscribe(
      (response) => {
        this.successMessage = "Notification Added";
      },
      (error) => {
        console.log("Error adding notification:", error);
        this.errorMessage = "Error adding notification";
        this.successMessage=null;
      }
    )
  }
}
