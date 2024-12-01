import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { Return } from '../../models/return.model';
import { AuthService } from '../../services/auth.service';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { ReturnRocordsService } from '../../services/return-rocords.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  overdueBooks: any[] = [];
  topPerformingBooks: any[] = [];

  returnRecord: Return = {
    returnId: '',
    borrowId: '',
    returnDate: new Date(),
    penaltyAmount: 0,
    processedBy: '',
  };

  constructor(private dashboardService: AdminDashboardService,
    private authService: AuthService,
    private borrowedBookService: BorrowedBooksService,
    private returnRecordService: ReturnRocordsService
  ) { }

  ngOnInit(): void {
    this.fetchOverdueBooks();
    this.fetchTopPerformingBooks();
  }

  fetchOverdueBooks(): void {
    this.dashboardService.getOverdueBooks().subscribe(
      (data) => {
        if (data.length > 0) {
  
          data.forEach(book => {
  
            this.dashboardService.getUserById(book.userId).subscribe(
              (userData) => {
                book.username = userData.username;
              },
              (userError) => {
                console.error('Error fetching user data for book', book.title, userError);
              }
            );
          });
  
          this.overdueBooks = data;
        } else {
          console.log('No overdue books found.');
        }
      },
      (error) => {
        console.error('Error fetching overdue books', error);
      }
    );
  }

  fetchTopPerformingBooks(): void {
    this.dashboardService.getTopPerformingBooks().subscribe(
      (data) => {
        if (data.length > 0) {
          this.topPerformingBooks = data;
        } else {
          console.log('No top-performing books found.');
        }
      },
      (error) => {
        console.error('Error fetching top-performing books', error);
      }
    );
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
      },
      error: (err) => {
        console.error('Error returning book:', err);
      }
    });


    this.returnRecordService.createReturn(this.returnRecord).subscribe(
      (response) => {
        console.log('Return saved:', response);
        this.overdueBooks = this.overdueBooks.filter(b => b.borrowId !== book.borrowId);
        alert('Return successfully recorded.');
      },
      (error) => {
        console.error('Error saving return:', error);
        alert('Failed to save return.');
      }
    );
  }
}
