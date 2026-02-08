import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdmissionService } from '../../../core/services/admission.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-entrance-exam',
  imports:[FormsModule, CommonModule, NgSelectModule],
  templateUrl: './entrance-exam.component.html'
})
export class EntranceExamComponent implements OnInit {

  applicantId!: number;
  exam: any = null;

  examDate: string = '';
  maxMarks!: number;
  passMarks!: number;
  marks!: number;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicantId = Number(this.route.snapshot.paramMap.get('applicantId'));
    this.loadExam();
  }

  loadExam(): void {
    this.admissionService.getExam(this.applicantId).subscribe({
      next: (res: any) => {
        this.exam = res || null;
      },
      error: () => {
        this.exam = null;
      }
    });
  }

  assignExam(): void {
    if (!this.examDate || !this.maxMarks || !this.passMarks) {
      Swal.fire('Missing Data', 'Fill all exam fields', 'warning');
      return;
    }

    const payload = {
      applicant_id: this.applicantId,
      exam_date: this.examDate,
      max_marks: this.maxMarks,
      pass_marks: this.passMarks
    };

    this.admissionService.assignEntranceExam(payload).subscribe({
      next: () => {
        Swal.fire('Assigned', 'Entrance exam assigned', 'success');
        this.loadExam();
      },
      error: (err) => {
        Swal.fire(
          'Error',
          err?.error?.message || 'Failed to assign exam',
          'error'
        );
      }
    });
  }

  evaluate(): void {
    if (this.marks === null || this.marks === undefined) {
      Swal.fire('Missing Marks', 'Enter obtained marks', 'warning');
      return;
    }

    Swal.fire({
      title: 'Evaluate Exam?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Evaluate'
    }).then(result => {
      if (!result.isConfirmed) return;

      this.admissionService.evaluateExam(this.exam.id, this.marks).subscribe({
        next: () => {
          Swal.fire('Evaluated', 'Exam evaluated successfully', 'success');
          this.loadExam();
        },
        error: (err) => {
          Swal.fire(
            'Error',
            err?.error?.message || 'Evaluation failed',
            'error'
          );
        }
      });
    });
  }

 get examResult(): string {
  if (!this.exam || this.exam.is_qualified === undefined) return '';
  return this.exam.is_qualified ? 'QUALIFIED' : 'REJECTED';
}

}
