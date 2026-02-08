import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdmissionService } from '../../../core/services/admission.service';
import { ClassService } from '../../../core/services/class.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-applicant-create',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './applicant-create.component.html'
})
export class ApplicantCreateComponent implements OnInit {

  form: any = {
    full_name: '',
    applying_class_id: null,
    primary_contact: '',
    email: ''
  };

  classes: any[] = [];
  submitting = false;

  constructor(
    private admissionService: AdmissionService,
    private classesService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classesService.getClasses().subscribe({
      next: (res: any) => {
        this.classes = res;
      },
      error: () => {
        Swal.fire('Error', 'Failed to load classes', 'error');
      }
    });
  }

  submit(): void {
    if (!this.form.full_name || !this.form.applying_class_id || !this.form.primary_contact) {
      Swal.fire('Missing Fields', 'Please fill all required fields', 'warning');
      return;
    }

    this.submitting = true;

    this.admissionService.createApplicant(this.form).subscribe({
      next: () => {
        this.submitting = false;
        Swal.fire('Success', 'Applicant created successfully', 'success')
          .then(() => {
            this.router.navigate(['/app/school-admin/admissions/applicants']);
          });
      },
      error: (err) => {
        this.submitting = false;
        Swal.fire(
          'Error',
          err?.error?.message || 'Failed to create applicant',
          'error'
        );
      }
    });
  }
}
