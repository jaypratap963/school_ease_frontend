import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { StudentService } from '../../core/services/student.service';
import { ClassService } from '../../core/services/class.service';

@Component({
  standalone: true,
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  classes: any[] = [];
  students: any[] = [];

  name = '';
  roll_no = '';
  class_id: number | null = null;

  loading = false;

  constructor(
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe(res => {
      this.classes = res;
    });
  }

  loadStudents() {
    if (!this.class_id) return;

    this.studentService.getByClass(this.class_id).subscribe(res => {
      this.students = res;
    });
  }

  createStudent() {
    if (!this.name || !this.class_id) {
      Swal.fire('Error', 'Name and class are required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create Student?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Create',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.studentService.createStudent({
        name: this.name.trim(),
        roll_no: this.roll_no.trim() || undefined,
        class_id: this.class_id!,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Student created',
            timer: 1200,
            showConfirmButton: false,
          });

          this.name = '';
          this.roll_no = '';
          this.loading = false;

          this.loadStudents();
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Failed to create student',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
