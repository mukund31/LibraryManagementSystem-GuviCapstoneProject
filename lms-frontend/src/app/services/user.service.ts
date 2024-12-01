import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getTotalUsers(): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/user-count`);
  }
}
