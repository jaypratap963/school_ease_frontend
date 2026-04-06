import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../../environments';

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private baseUrl = `${environment.baseUrl}/timetable`;

  constructor(private http: HttpClient) {}

  createOrGetTimetable(payload: {
    academic_session_id: number;
    class_id: number;
  }): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  addPeriod(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/period`, payload);
  }

  getClassTimetable(class_id: number, academic_session_id: number) {
    const params = new HttpParams()
      .set('class_id', class_id)
      .set('academic_session_id', academic_session_id);

    return this.http.get<any[]>(`${this.baseUrl}/class`, { params });
  }

  getTeacherTimetable(academic_session_id: number) {
    const params = new HttpParams().set('academic_session_id', academic_session_id);
    return this.http.get<any[]>(`${this.baseUrl}/teacher`, { params });
  }
}
