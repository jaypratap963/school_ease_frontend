import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MarksService {
  constructor(private api: ApiService) {}

  submitMarks(payload: any) {
    return this.api.post('/marks', payload);
  }

  getMarks(classId: number, subjectId: number, examId: number) {
    return this.api.get<any[]>(
      `/marks?classId=${classId}&subjectId=${subjectId}&examId=${examId}`
    );
  }

  saveMarks(payload: any) {
    return this.api.post('/marks/save', payload);
  }

  lockMarks(payload: any) {
    return this.api.post('/marks/lock', payload);
  }
}
