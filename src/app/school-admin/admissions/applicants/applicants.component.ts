import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdmissionService } from '../../../core/services/admission.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-applicants',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './applicants.component.html'
})
export class ApplicantsComponent implements OnInit {

  applicants: any[] = [];
  loading = false;

  constructor(
    private admissionService: AdmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApplicants();
  }

  loadApplicants(): void {
    this.loading = true;
    this.admissionService.getApplicants().subscribe({
      next: (res: any) => {
        this.applicants = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load applicants', 'error');
      }
    });
  }

  navigateNew(): void {
    this.router.navigate(['/app/school-admin/admissions/applicants/new']);
  }

  openExam(applicant: any): void {
    console.log('applicant', applicant);
    this.router.navigate([
      '/app/school-admin/admissions/entrance-exam',
      applicant.id
    ]);
  }
}
