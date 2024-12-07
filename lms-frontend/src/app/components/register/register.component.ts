import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: User = {
    name: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNum: 0,
    preferedGenres: '',
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profileImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
