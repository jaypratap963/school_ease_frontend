import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  constructor(private api: ApiService) {}

  generate(payload: { applicant_id: number }) {
    return this.api.post('/enrollment/generate', payload);
  }
}
