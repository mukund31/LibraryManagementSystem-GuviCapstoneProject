import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role || '';
      } catch (error) {
        console.error('Invalid token format:', error);
        return '';
      }
    }
    return '';
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
  
        if (payload && payload.userId) {
          return payload.userId;
        }
        console.error('User ID not found in token payload.');
      } catch (error) {
        console.error('Invalid token format:', error);
      }
    }
    return null;
  }
  

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;
        return Date.now() < expiry;
      } catch (error) {
        console.error('Invalid token format:', error);
      }
    }
    return false;
  }

  checkAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }
}
