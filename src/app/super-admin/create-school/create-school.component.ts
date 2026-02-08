import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { SuperAdminService } from '../../core/services/super-admin.service';

@Component({
  standalone: true,
  selector: 'app-create-school',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-school.component.html',
})
export class CreateSchoolComponent {
  name = '';
  address = '';
  loading = false;

  constructor(private superAdminService: SuperAdminService) {}

  submit() {
    if (!this.name.trim() || !this.address.trim()) {
      Swal.fire('Error', 'School name and address are required', 'error');
      return;
    }

    this.loading = true;

    this.superAdminService.createSchool({
      name: this.name.trim(),
      address: this.address.trim(),
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'School created successfully',
          timer: 1500,
          showConfirmButton: false,
        });

        this.name = '';
        this.address = '';
        this.loading = false;
      },
      error: (err) => {
        Swal.fire(
          'Error',
          err.error?.message || 'Failed to create school',
          'error'
        );
        this.loading = false;
      },
    });
  }
}
