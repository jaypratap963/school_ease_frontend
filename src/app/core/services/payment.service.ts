import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private api: ApiService) {}

  pay(payload: {
    applicant_id: number;
    installment_id: number;
    amount_paid: number;
  }) {
    return this.api.post('/payments/pay', payload);
  }
}
