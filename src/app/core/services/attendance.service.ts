import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  constructor(private api: ApiService) {}

  getAttendance(classId: number, date: string) {
    return this.api.get<any[]>(
      `/attendance?classId=${classId}&date=${date}`
    );
  }

  saveAttendance(payload: any) {
    return this.api.post('/teacher/attendance', payload);
  }
}
