import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDashboardServiceService } from '../../services/user-dashboard-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  userProfile: any = {};
  isDropdownOpen = false;

  constructor(private userDashboardService: UserDashboardServiceService, 
    private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userDashboardService.getUserProfile(userId).subscribe(
        (profile) => {
          this.userProfile = profile;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
    document.addEventListener('click', this.closeDropdownOnOutsideClick.bind(this));
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdownOnOutsideClick.bind(this));
  }
  
  closeDropdownOnOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }
}
