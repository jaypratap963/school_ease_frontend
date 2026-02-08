import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  constructor(private api: ApiService) {}

  getByClass(classId: number) {
    return this.api.get<any[]>(`/teacher-subjects/by-class/${classId}`);
  }

  getSubjects() {
    return this.api.get<any[]>('/schooladmin/subjects');
  }

  createSubject(payload: { name: string }) {
    return this.api.post('/schooladmin/subjects', payload);
  }
}
