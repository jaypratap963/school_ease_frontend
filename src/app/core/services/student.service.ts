import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private api: ApiService) {}

  getByClass(classId: number) {
    return this.api.get<any[]>(`/schooladmin/students/${classId}`);
  }

  createStudent(payload: {
    name: string;
    roll_no?: string;
    class_id: number;
  }) {
    return this.api.post('/schooladmin/students', payload);
  }
}
