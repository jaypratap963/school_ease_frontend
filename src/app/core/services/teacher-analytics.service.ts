import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TeacherAnalyticsService {
  constructor(private api: ApiService) {}

  getAttendanceSummary(classId: number) {
    return this.api.get(
      `/teacher/attendance/summary?classId=${classId}`
    );
  }

  getAttendanceStudents(classId: number) {
    return this.api.get(
      `/teacher/attendance/students?classId=${classId}`
    );
  }

  getMarksSummary(classId: number, subjectId: number, examId: number) {
    return this.api.get(
      `/teacher/marks/subject-summary?classId=${classId}&subjectId=${subjectId}&examId=${examId}`
    );
  }

  getMarksStudents(classId: number, subjectId: number, examId: number) {
    return this.api.get(
      `/teacher/marks/students?classId=${classId}&subjectId=${subjectId}&examId=${examId}`
    );
  }
}
