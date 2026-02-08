import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeacherDashboardService } from '../../core/services/teacher-dashboard.service';
@Component({
  selector: 'app-teacher-dashboard',
  imports:[CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit{
  session: any;
  teacher: any;
  assignments: any[] = [];
  studentCounts: any[] = [];

  constructor(private service: TeacherDashboardService) {}

  ngOnInit() {
    this.service.getDashboard().subscribe((res : any) => {
      this.session = res.session;
      this.teacher = res.teacher;
      this.assignments = res.assignments;
      this.studentCounts = res.studentCounts;
    });
  }

  getStudentCount(classId: number) {
    return (
      this.studentCounts.find(c => c.class_id === classId)?.total || 0
    );
  }
}
