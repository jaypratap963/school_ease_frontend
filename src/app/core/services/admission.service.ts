import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AdmissionService {
  constructor(private api: ApiService) {}

  // Applicants
  getApplicants() {
    return this.api.get('/admissions/applicants');
  }

  createApplicant(payload: any) {
    return this.api.post('/admissions/applicants', payload);
  }

  getApplicant(id: number) {
    return this.api.get(`/admissions/applicants/${id}`);
  }

  // Entrance Exam
  assignEntranceExam(payload: any) {
    return this.api.post('/admissions/entrance-exams', payload);
  }

  getExam(applicantId: number) {
    return this.api.get(`/admissions/entrance-exams/${applicantId}`);
  }

  evaluateExam(examId: number, marks: number) {
    return this.api.post(`/admissions/entrance-exams/${examId}/evaluate`, {
      marks_obtained: marks
    });
  }

  getOffers() {
    return this.api.get('/admissions/offers');
  }

  createOffer(payload: {
  applicant_id: number;
  academic_session_id: number;
  offered_class_id: number;
}) {
  return this.api.post('/admissions/offers', payload);
}

respondToOffer(payload: {
  offer_id: number;
  status: 'ACCEPTED' | 'REJECTED';
}) {
  return this.api.patch('/admissions/offer/respond', payload);
}

createAdmissionFee(payload: { offer_id: number; amount: number }) {
  return this.api.post('/admissions/fees/admission', payload);
}

// Get admission fees (school admin)
getAdmissionFees() {
  return this.api.get('/admissions/fees/admission');
}

// Mock pay admission fee
payAdmissionFee(feePaymentId: number) {
  return this.api.post('/admissions/fees/pay', {
    fee_payment_id: feePaymentId
  });
}

convertToStudent(fee_payment_id: number) {
  return this.api.post('/admissions/enrollment/convert', { fee_payment_id });
}

getPaidAdmissionFees() {
  return this.api.get('/admissions/fees/paid');
}

generateEnrollment(feePaymentId: number) {
  return this.api.post('/admissions/enrollment/generate', {
    fee_payment_id: feePaymentId
  });
}

}

