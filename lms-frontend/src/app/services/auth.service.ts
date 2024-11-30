import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';  // Key to store the token in localStorage

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  // Login user and get the token
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove token from localStorage (Logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Extract role from the JWT token
  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role || '';  // Assuming token contains a 'role' field
      } catch (error) {
        console.error('Invalid token format:', error);
        return '';
      }
    }
    return '';
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // Check if the user is a regular user
  isUser(): boolean {
    return this.getRole() === 'user';
  }
}
