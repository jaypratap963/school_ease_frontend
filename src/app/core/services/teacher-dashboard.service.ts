import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TeacherDashboardService {
  constructor(private api: ApiService) {}

  getDashboard() {
    return this.api.get('/teacher/dashboard');
  }
}

