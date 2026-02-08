import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AdminAnalyticsService {
  constructor(private api: ApiService) {}

  // Attendance
  getAttendanceSummary() {
    return this.api.get('/admin/analytics/attendance/summary');
  }

  getAttendanceByClass() {
    return this.api.get('/admin/analytics/attendance/classes');
  }

  getAttendanceRiskStudents() {
    return this.api.get('/admin/analytics/attendance/risk-students');
  }

  // Marks
  getMarksByExam() {
    return this.api.get('/admin/analytics/marks/exams');
  }

  getMarksByClass() {
    return this.api.get('/admin/analytics/marks/classes');
  }

  getMarksRiskStudents() {
    return this.api.get('/admin/analytics/marks/risk-students');
  }
}
