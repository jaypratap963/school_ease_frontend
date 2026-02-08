import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ClassService {
  constructor(private api: ApiService) {}

  getTeacherClasses() {
    return this.api.get<any[]>('/classes/teacher');
  }

   getClasses() {
    return this.api.get<any[]>('/schooladmin/classes');
  }

  createClass(payload: {
    class_name: string;
    section: string;
    teacher_id?: number;
  }) {
    return this.api.post('/schooladmin/classes', payload);
  }
}
