import { Component, OnInit } from '@angular/core';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { Router } from '@angular/router';
import { UserDashboardServiceService } from '../../services/user-dashboard-service.service';
import { AuthService } from '../../services/auth.service';

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
  
  constructor(private userDashBoardService: UserDashboardServiceService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchBorrowingHistory();
  }

  fetchBorrowingHistory(): void {
    const userId = this.authService.getUserId();
  
    if (userId) {
      this.userDashBoardService.getBorrowingHistory(userId).subscribe({
        next: (response) => {
          this.borrowedBooks = response;
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
  }
}
