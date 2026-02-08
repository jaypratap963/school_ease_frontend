import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  constructor(private api: ApiService) {}

  getAssignments() {
    return this.api.get<any[]>('/teacher/assignments');
  }

  getTeachers() {
    return this.api.get<any[]>('/schooladmin/teachers');
  }

  createTeacher(payload: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.api.post('/schooladmin/teachers', payload);
  }
}
