import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

import { SuperAdminService } from '../../core/services/super-admin.service';

@Component({
  standalone: true,
  selector: 'app-create-school-admin',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './create-school-admin.component.html',
})
export class CreateSchoolAdminComponent implements OnInit {
  schools: any[] = [];

  email = '';
  password = '';
  selectedSchoolId: number | null = null;

  loading = false;

  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.superAdminService.getSchools().subscribe(res => {
      this.schools = res;
    });
  }

  submit() {
    if (!this.email || !this.password || !this.selectedSchoolId) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create School Admin?',
      text: 'This admin will manage the selected school',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Create',
    }).then(result => {
      if (!result.isConfirmed) return;

      this.loading = true;

      this.superAdminService.createSchoolAdmin({
        email: this.email.trim(),
        password: this.password,
        school_id: this.selectedSchoolId!,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'School Admin created',
            timer: 1500,
            showConfirmButton: false,
          });

          this.email = '';
          this.password = '';
          this.selectedSchoolId = null;
          this.loading = false;
        },
        error: err => {
          Swal.fire(
            'Error',
            err.error?.message || 'Failed to create school admin',
            'error'
          );
          this.loading = false;
        },
      });
    });
  }
}
