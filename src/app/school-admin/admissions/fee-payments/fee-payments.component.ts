import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdmissionService } from '../../../core/services/admission.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fee-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fee-payments.component.html'
})
export class FeePaymentsComponent implements OnInit {

  fees: any[] = [];
  loading = false;

  constructor(private admissionService: AdmissionService) {}

  ngOnInit(): void {
    this.loadFees();
  }

  loadFees(): void {
    this.loading = true;

    this.admissionService.getAdmissionFees().subscribe({
      next: (res: any) => {
        this.fees = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'Failed to load admission fees', 'error');
      }
    });
  }

  pay(feeId: number): void {
    Swal.fire({
      title: 'Confirm Payment?',
      text: 'This will mark the admission fee as PAID (Mock)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Pay'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.admissionService.payAdmissionFee(feeId).subscribe({
        next: () => {
          Swal.fire('Success', 'Admission fee paid', 'success');
          this.loadFees();
        },
        error: (err) => {
          Swal.fire(
            'Error',
            err?.error?.message || 'Payment failed',
            'error'
          );
        }
      });
    });
  }
}
