import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { TeacherService } from '../../core/services/teacher.service';
import { ClassService } from '../../core/services/class.service';
import { SubjectService } from '../../core/services/subject.service';
import { AssignmentService } from '../../core/services/assignment.service';

@Component({
  standalone: true,
  selector: 'app-assignments',
  imports: [CommonModule, FormsModule],
  templateUrl: './assignments.component.html',
})
export class AssignmentsComponent implements OnInit {
  teachers: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  assignments: any[] = [];

  teacher_id: number | null = null;
  class_id: number | null = null;
  subject_id: number | null = null;

  loading = false;

  constructor(
    private teacherService: TeacherService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(res => (this.teachers = res));
    this.classService.getClasses().subscribe(res => (this.classes = res));
    this.subjectService.getSubjects().subscribe(res => (this.subjects = res));

    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getAssignments().subscribe(res => {
      this.assignments = res;
    });
  }

  assign() {
    if (!this.teacher_id || !this.class_id || !this.subject_id) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    Swal.fire({
      title: 'Assign Teacher?',
      text: 'This controls attendance and marks access',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Assign',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.assignmentService.assignTeacher({
        teacher_id: this.teacher_id!,
        class_id: this.class_id!,
        subject_id: this.subject_id!,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Assignment saved',
            timer: 1200,
            showConfirmButton: false,
          });

          this.teacher_id = null;
          this.class_id = null;
          this.subject_id = null;
          this.loading = false;

          this.loadAssignments();
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Assignment failed',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
