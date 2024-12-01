import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  overdueBooks: any[] = [];
  topPerformingBooks: any[] = [];

  constructor(private dashboardService: AdminDashboardService) { }

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
}
