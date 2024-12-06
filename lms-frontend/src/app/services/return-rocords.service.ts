import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../models/return.model';

@Injectable({
  providedIn: 'root'
})
export class ReturnRocordsService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createReturn(returnRecord: Return): Observable<Return> {
    return this.http.post<Return>(`${this.apiUrl}/add-return-record`, returnRecord, {
      headers: this.getHeaders()});
  }

  createPenaltyRecord(penaltyRecord: any): Observable<any> {
    return this.http.post<Return>(`${this.apiUrl}/pay-penalty`, penaltyRecord, {
      headers: this.getHeaders()});
  }
}
