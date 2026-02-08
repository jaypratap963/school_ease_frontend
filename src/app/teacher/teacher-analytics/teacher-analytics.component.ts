import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ClassService } from '../../core/services/class.service';
import { SubjectService } from '../../core/services/subject.service';
import { ExamService } from '../../core/services/exam.service';
import { TeacherAnalyticsService } from '../../core/services/teacher-analytics.service';

@Component({
  standalone: true,
  selector: 'app-teacher-analytics',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './teacher-analytics.component.html'
})
export class TeacherAnalyticsComponent implements OnInit {
  classes: any[] = [];
  subjects: any[] = [];
  exams: any[] = [];

  selectedClassId: number | null = null;
  selectedSubjectId: number | null = null;
  selectedExamId: number | null = null;

  attendanceSummary: any;
  attendanceStudents: any[] = [];

  marksSummary: any;
  marksStudents: any[] = [];

  loading = false;

  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private examService: ExamService,
    private analyticsService: TeacherAnalyticsService
  ) {}

  ngOnInit(): void {
    this.classService.getTeacherClasses().subscribe(res => {
      this.classes = res;
    });

    this.examService.getAll().subscribe(res => {
      this.exams = res;
    });
  }

  onClassChange() {
    this.selectedSubjectId = null;
    this.selectedExamId = null;

    this.subjectService
      .getByClass(this.selectedClassId!)
      .subscribe(res => {
        this.subjects = res;
      });

    this.loadAttendanceAnalytics();
  }

  loadAttendanceAnalytics() {
    if (!this.selectedClassId) return;

    this.analyticsService
      .getAttendanceSummary(this.selectedClassId)
      .subscribe(res => (this.attendanceSummary = res));

    this.analyticsService
      .getAttendanceStudents(this.selectedClassId)
      .subscribe((res:any) => (this.attendanceStudents = res));
  }

  loadMarksAnalytics() {
    if (
      !this.selectedClassId ||
      !this.selectedSubjectId ||
      !this.selectedExamId
    )
      return;

    this.analyticsService
      .getMarksSummary(
        this.selectedClassId,
        this.selectedSubjectId,
        this.selectedExamId
      )
      .subscribe(res => (this.marksSummary = res));

    this.analyticsService
  .getMarksStudents(this.selectedClassId, this.selectedSubjectId, this.selectedExamId)
  .subscribe((res: any) => { // Explicitly typing 'res' here
    this.marksStudents = res;
  });
  }

  getRiskLabel(percent: number) {
    if (percent < 60) return 'text-danger';
    if (percent < 75) return 'text-warning';
    return 'text-success';
  }
}
