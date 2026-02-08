import { Component } from '@angular/core';
import { FeeService } from '../../../core/services/fee.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  selector: 'app-fee-structures',
  templateUrl: './fee-structures.component.html'
})
export class FeeStructuresComponent {
  academic_session_id!: number;
  class_id!: number;
  frequency = 'MONTHLY';
  total_amount!: number;
  installment_count = 12;

  constructor(private feeService: FeeService) {}

  createStructure() {
    Swal.fire({ title: 'Create Fee Structure?', showCancelButton: true })
      .then(res => {
        if (!res.isConfirmed) return;

        this.feeService.createStructure({
          academic_session_id: this.academic_session_id,
          class_id: this.class_id,
          frequency: this.frequency,
          total_amount: this.total_amount,
          installment_count: this.installment_count
        }).subscribe(() => {
          Swal.fire('Success', 'Fee structure created', 'success');
        });
      });
  }
}
