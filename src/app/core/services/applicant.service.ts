import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ApplicantService {
  constructor(private api: ApiService) {}

  getQualified() {
    return this.api.get('/admissions/applicants/qualified');
  }
}
