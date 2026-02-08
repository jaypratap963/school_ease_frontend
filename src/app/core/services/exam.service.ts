import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ExamService {
  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get<any[]>('/exams');
  }
}
