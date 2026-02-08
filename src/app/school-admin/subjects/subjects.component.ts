import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { SubjectService } from '../../core/services/subject.service';

@Component({
  standalone: true,
  selector: 'app-subjects',
  imports: [CommonModule, FormsModule],
  templateUrl: './subjects.component.html',
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  name = '';
  loading = false;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe(res => {
      this.subjects = res;
    });
  }

  createSubject() {
    if (!this.name.trim()) {
      Swal.fire('Error', 'Subject name is required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create Subject?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Create',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.subjectService.createSubject({
        name: this.name.trim(),
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Subject created',
            timer: 1200,
            showConfirmButton: false,
          });

          this.name = '';
          this.loading = false;
          this.loadSubjects();
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Failed to create subject',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
