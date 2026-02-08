import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAnalyticsService } from '../../core/services/admin-analytics.service';

@Component({
  standalone: true,
  selector: 'app-admin-analytics',
  imports: [CommonModule],
  templateUrl: './admin-analytics.component.html'
})
export class AdminAnalyticsComponent implements OnInit {

  attendanceSummary: any;
  attendanceByClass: any[] = [];
  attendanceRiskStudents: any[] = [];

  marksByExam: any[] = [];
  marksByClass: any[] = [];
  marksRiskStudents: any[] = [];

  constructor(private analytics: AdminAnalyticsService) {}

  ngOnInit(): void {
    this.loadAttendance();
    this.loadMarks();
  }

  loadAttendance() {
    this.analytics.getAttendanceSummary()
      .subscribe(res => this.attendanceSummary = res);

    this.analytics.getAttendanceByClass()
      .subscribe((res:any) => this.attendanceByClass = res);

    this.analytics.getAttendanceRiskStudents()
      .subscribe((res:any) => this.attendanceRiskStudents = res);
  }

  loadMarks() {
    this.analytics.getMarksByExam()
      .subscribe((res:any) => this.marksByExam = res);

    this.analytics.getMarksByClass()
      .subscribe((res:any) => this.marksByClass = res);

    this.analytics.getMarksRiskStudents()
      .subscribe((res:any) => this.marksRiskStudents = res);
  }

  riskClass(value: number) {
    if (value < 60) return 'text-danger';
    if (value < 75) return 'text-warning';
    return 'text-success';
  }
}
