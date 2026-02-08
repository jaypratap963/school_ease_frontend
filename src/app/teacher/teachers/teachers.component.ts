import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { TeacherService } from '../../core/services/teacher.service';

@Component({
  standalone: true,
  selector: 'app-teachers',
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.component.html',
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];

  name = '';
  email = '';
  password = '';

  loading = false;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(res => {
      this.teachers = res;
    });
  }

  createTeacher() {
    if (!this.name || !this.email || !this.password) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create Teacher?',
      text: 'Teacher will be able to login immediately',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Create',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.teacherService.createTeacher({
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Teacher created',
            timer: 1500,
            showConfirmButton: false,
          });

          this.name = '';
          this.email = '';
          this.password = '';
          this.loading = false;

          this.loadTeachers();
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Failed to create teacher',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
