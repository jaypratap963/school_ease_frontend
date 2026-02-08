import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClassService } from '../../core/services/class.service';
import { TeacherService } from '../../core/services/teacher.service';

@Component({
  standalone: true,
  selector: 'app-classes',
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnInit {
  classes: any[] = [];
  teachers: any[] = [];

  class_name = '';
  section = '';
  teacher_id: number | null = null;

  loading = false;

  constructor(
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    this.teacherService.getTeachers().subscribe(res => {
      this.teachers = res;
    });
  }

  loadClasses() {
    this.classService.getClasses().subscribe(res => {
      this.classes = res;
    });
  }

  createClass() {
    if (!this.class_name || !this.section) {
      Swal.fire('Error', 'Class and section are required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create Class?',
      text: 'This class will be used across attendance and marks',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Create',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.classService.createClass({
        class_name: this.class_name.trim(),
        section: this.section.trim(),
        teacher_id: this.teacher_id || undefined,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Class created',
            timer: 1200,
            showConfirmButton: false,
          });

          this.class_name = '';
          this.section = '';
          this.teacher_id = null;
          this.loading = false;

          this.loadClasses();
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Failed to create class',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
