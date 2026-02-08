import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FeeService {
  constructor(private api: ApiService) {}

  createStructure(payload: {
    academic_session_id: number;
    class_id: number;
    frequency: string;
    total_amount: number;
    installment_count: number;
  }) {
    return this.api.post('/fees/structure', payload);
  }

  getInstallments(applicantId: number) {
    return this.api.get(`/fees/installments/${applicantId}`);
  }

  getStructures() {
    return this.api.get('/fees/structures');
  }

  // Fee Schedule
  createSchedule(data: any) {
    return this.api.post('/fees/schedules', data);
  }

  getSchedules(structureId: number) {
    return this.api.get(`/fees/schedules/${structureId}`);
  }

  // Fee Demands
  generateDemands(data: any) {
    return this.api.post('/fees/demands/generate', data);
  }

  getStudentDemands(studentId: number) {
    return this.api.get(`/fees/demands/student/${studentId}`);
  }

  // Payments
  payFee(data: any) {
    return this.api.post('/fees/payments/pay', data);
  }
}
