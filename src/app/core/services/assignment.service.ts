import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  constructor(private api: ApiService) {}

  getAssignments() {
    return this.api.get<any[]>('/schooladmin/assignments');
  }

  assignTeacher(payload: {
    teacher_id: number;
    class_id: number;
    subject_id: number;
  }) {
    return this.api.post('/schooladmin/assign-teacher-subject', payload);
  }
}
