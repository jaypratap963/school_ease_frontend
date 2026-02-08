import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  [x: string]: any;
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  patch<T>(url: string, body: any) {
    return this.http.patch<T>(this.baseUrl + url, body);
  }
}
