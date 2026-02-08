import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../../core/services/applicant.service';
import { AdmissionService } from '../../../core/services/admission.service';
import { AcademicSessionService } from '../../../core/services/academic-session.service';
import { ClassService } from '../../../core/services/class.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  standalone: true, 
  imports: [CommonModule, FormsModule, NgSelectModule],
  selector: 'app-admission-offers',
  templateUrl: './admission-offers.component.html'
})
export class AdmissionOffersComponent implements OnInit {
  applicants: any[] = [];
  sessions: any[] = [];
  classes: any[] = [];
  loading: boolean = false;

  selectedApplicant!: number;
  selectedSession!: number;
  selectedClass!: number;
  offers: any[] = [];

  constructor(
    private applicantService: ApplicantService,
    private academicService: AcademicSessionService,
    private classService: ClassService,
    private admissionService: AdmissionService
  ) {}

  ngOnInit() {
    this.applicantService.getQualified().subscribe((res:any) => this.applicants = res);
    this.academicService.getAll().subscribe((res:any) => this.sessions = res);
    this.classService.getClasses().subscribe((res:any) => this.classes = res);
    this.loadOffers();
     
  }

  loadOffers(){
    this.admissionService.getOffers().subscribe((res:any) => {
    this.offers = res;
  });
  }
  createOffer() {
    if (!this.selectedApplicant || !this.selectedSession || !this.selectedClass) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    Swal.fire({ title: 'Create Offer?', showCancelButton: true })
      .then(res => {
        if (!res.isConfirmed) return;

        this.admissionService.createOffer({
          applicant_id: this.selectedApplicant,
          academic_session_id: this.selectedSession,
          offered_class_id: this.selectedClass
        }).subscribe(() => {
          Swal.fire('Success', 'Offer created', 'success');
        });
      });
  }

  respond(offerId: number, status: 'ACCEPTED' | 'REJECTED') {
  Swal.fire({
    title: `Are you sure?`,
    text: `You are about to ${status.toLowerCase()} this offer`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes'
  }).then(res => {
    if (!res.isConfirmed) return;

    this.admissionService.respondToOffer({
      offer_id: offerId,
      status
    }).subscribe({
      next: () => {
        Swal.fire('Updated', `Offer ${status}`, 'success');
        this.loadOffers();
      },
      error: err => {
        Swal.fire(
          'Error',
          err?.error?.message || 'Action failed',
          'error'
        );
      }
    });
  });
}


  
generateFee(offer: any) {
  Swal.fire({
    title: 'Admission Fee Amount',
    input: 'number',
    showCancelButton: true
  }).then(result => {
    if (!result.isConfirmed) return;

    this.admissionService.createAdmissionFee({
      offer_id: offer.id,
      amount: result.value
    }).subscribe(() => {
      Swal.fire('Success', 'Fee generated', 'success');
      this.ngOnInit();
    });
  });
}

payFee(offer: any) {
  this.admissionService.payAdmissionFee(offer.fee_payment_id)
    .subscribe(() => {
      Swal.fire('Paid', 'Fee paid successfully', 'success');
      this.ngOnInit();
    });
}

convert(offer: any) {
  this.admissionService.convertToStudent(offer.fee_payment_id)
    .subscribe(() => {
      Swal.fire('Enrolled', 'Student created', 'success');
      this.ngOnInit();
    });
}
}
