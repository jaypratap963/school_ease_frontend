import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdmissionService } from '../../../core/services/admission.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-enrollment',
  imports: [CommonModule],
  templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent implements OnInit {

  paidFees: any[] = [];

  constructor(private admissionService: AdmissionService) {}

  ngOnInit(): void {
    this.loadPaidFees();
  }

  loadPaidFees(): void {
    this.admissionService.getPaidAdmissionFees().subscribe({
      next: (res: any) => this.paidFees = res,
      error: () => Swal.fire('Error', 'Failed to load fees', 'error')
    });
  }

  enroll(feeId: number): void {
    Swal.fire({
      title: 'Generate Enrollment?',
      text: 'This action is permanent',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Generate'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.admissionService.generateEnrollment(feeId).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Enrolled',
            `Enrollment No: ${res.student.enrollment_no}`,
            'success'
          );
          this.loadPaidFees();
        },
        error: (err) => {
          Swal.fire(
            'Error',
            err?.error?.message || 'Enrollment failed',
            'error'
          );
        }
      });
    });
  }
}
