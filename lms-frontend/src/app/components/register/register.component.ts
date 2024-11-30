import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNum: '',
    role: ''
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if(this.user.password === this.user.confirmPassword) {
      this.authService.register(this.user).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          this.errorMessage = error?.error || 'Registration failed. Please try again.';
        }
      );
    }
    else {
      this.errorMessage = "Both Passwords must Match";
    }
  }
}
