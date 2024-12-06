import { Component, OnInit } from '@angular/core';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { Router } from '@angular/router';
import { UserDashboardServiceService } from '../../services/user-dashboard-service.service';
import { AuthService } from '../../services/auth.service';
import { ReturnRocordsService } from '../../services/return-rocords.service';
import { Return } from '../../models/return.model';
import { BorrowingHistoryService } from '../../services/borrowing-history.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  borrowedBooks: any[] = [];
  totalBooksBorrowed: number = 0;
  overdueBooksCount: number = 0;
  loading: boolean = true;

  showPenaltyModal: boolean = false;
  penaltyReason: string = '';
  penaltyAmount: number = 0;
  selectedBook: any = null;
  bookRec: any =null;

  returnRecord: Return = {
    returnId: '',
    borrowId: '',
    returnDate: new Date(),
    penaltyAmount: 0,
    processedBy: '',
  };
  
  constructor(private userDashBoardService: UserDashboardServiceService,
    private borrowedBookService: BorrowedBooksService,
    private returnRecordService: ReturnRocordsService,
    private borrowingHistoryService: BorrowingHistoryService,
    private router: Router, 
    private authService: AuthService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBorrowingHistory();
  }

  fetchBorrowingHistory(): void {
    const userId = this.authService.getUserId();
  
    if (userId) {
      this.userDashBoardService.getBorrowingHistory(userId).subscribe({
        next: (response) => {
          console.log(response);
          this.borrowedBooks = response || [];
          this.totalBooksBorrowed = this.borrowedBooks.length;
          this.overdueBooksCount = this.borrowedBooks.filter(book => this.getDaysOverdue(book.dueDate) > 0).length;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching borrowed books:', err);
          this.loading = false;
        }
      });
    } else {
      console.error('User ID is not available');
      this.loading = false;
      this.router.navigate(['/login']);
    }
  }
  

  getDaysOverdue(dueDate: string): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  calculatePenalty(dueDate: string): number {
    const daysOverdue = this.getDaysOverdue(dueDate);
    const penaltyPerDay = 1;
    return daysOverdue * penaltyPerDay;
    // return 100;
  }

  returnBook(book: any): void {

    this.returnRecord = {
      borrowId: book.borrowId,
      returnDate: new Date(),
      penaltyAmount: this.calculatePenalty(book.dueDate),
      processedBy: this.authService.getUserId() || 'Self',
    };

    this.borrowedBookService.returnBook(book.borrowId).subscribe({
      next: (response) => {
        console.log(response);
        this.borrowedBooks = this.borrowedBooks.filter(b => b.borrowId !== book.borrowId);
      },
      error: (err) => {
        console.error('Error returning book:', err);
      }
    });


    this.returnRecordService.createReturn(this.returnRecord).subscribe(
      (response) => {
        console.log('Return saved:', response);
      },
      (error) => {
        console.error('Error saving return:', error);
      }
    );

    let borrowingHistoryRecord= {
      "userId": this.authService.getUserId(),
      "bookId": book.bookId,
      "borrowId": book.borrowId
    }


    this.borrowingHistoryService.createBorrowingHistory(borrowingHistoryRecord).subscribe(
      (response) => {
        console.log('Borrowing History saved:', response);
      },
      (error) => {
        console.error('Error saving borrowing history:', error);
      }
    );
  }


  payAndReturnBook(book: any): void {
    this.openPenaltyModal(book);
    this.bookRec=book;
  }
  
  openPenaltyModal(book: any): void {
    this.selectedBook = book;
    this.penaltyAmount = this.calculatePenalty(book.dueDate);
    this.showPenaltyModal = true;
  }

  closePenaltyModal(): void {
    this.showPenaltyModal = false;
    this.penaltyReason = '';
    this.penaltyAmount = 0;
    this.selectedBook = null;
  }

  submitPenalty(): void {
    if (!this.selectedBook) return;

    const penaltyRecord = {
      userId: this.authService.getUserId(),
      amount: this.penaltyAmount,
      reason: this.penaltyReason,
      dateIssued: new Date(),
      status: 'Paid',
    };

    this.returnRecordService.createPenaltyRecord(penaltyRecord).subscribe(
      (response) => {
        console.log('Penalty saved:', response);
      },
      (error) => {
        console.error('Error saving penalty:', error);
      }
    );

    this.returnRecord = {
      borrowId: this.bookRec.borrowId,
      returnDate: new Date(),
      penaltyAmount: this.calculatePenalty(this.bookRec.dueDate),
      processedBy: this.authService.getUserId() || 'Self',
    };

    this.borrowedBookService.returnBook(this.bookRec.borrowId).subscribe({
      next: (response) => {
        console.log(response);
        this.borrowedBooks = this.borrowedBooks.filter(b => b.borrowId !== this.bookRec.borrowId);
      },
      error: (err) => {
        console.error('Error returning book:', err);
      }
    });


    this.returnRecordService.createReturn(this.returnRecord).subscribe(
      (response) => {
        console.log('Return saved:', response);
      },
      (error) => {
        console.error('Error saving return:', error);
      }
    );

    let borrowingHistoryRecord= {
      "userId": this.authService.getUserId(),
      "bookId": this.bookRec.bookId,
      "borrowId": this.bookRec.borrowId
    }


    this.borrowingHistoryService.createBorrowingHistory(borrowingHistoryRecord).subscribe(
      (response) => {
        console.log('Borrowing History saved:', response);
      },
      (error) => {
        console.error('Error saving borrowing history:', error);
      }
    );
  }
}
