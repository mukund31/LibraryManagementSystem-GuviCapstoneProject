import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../models/return.model';

@Injectable({
  providedIn: 'root'
})
export class ReturnRocordsService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createReturn(returnRecord: Return): Observable<Return> {
    return this.http.post<Return>(`${this.apiUrl}/add-return-record`, returnRecord);
  }
}
