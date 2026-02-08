import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SchoolAdminDashboardService {
  constructor(private api: ApiService) {}

  getDashboard() {
    return this.api.get('/schooladmin/dashboard');
  }
}
