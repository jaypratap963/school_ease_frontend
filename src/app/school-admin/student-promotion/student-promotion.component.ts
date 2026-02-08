import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { PromotionService } from '../../core/services/promotion.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-student-promotion',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './student-promotion.component.html',
  styleUrl: './student-promotion.component.scss'
})
export class StudentPromotionComponent implements OnInit {
  fromClassId!: number;
  toClassId!: number;
  fromSessionId!: number;
  toSessionId!: number;

  students: any[] = [];
  selectedStudentIds: number[] = [];

  sessions: any[] = [];
classes: any[] = [];

  constructor(
    private studentService: StudentService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    
  }

  loadStudents() {
    this.studentService.getByClass(this.fromClassId).subscribe(res => {
      this.students = res;
      this.selectedStudentIds = [];
    });
  }

  toggle(studentId: number, checked: Event) {
    const isChecked = checked.target;
    if (isChecked) {
      this.selectedStudentIds.push(studentId);
    } else {
      this.selectedStudentIds =
        this.selectedStudentIds.filter(id => id !== studentId);
    }
  }

  promote() {
    if (!this.selectedStudentIds.length) {
      Swal.fire('Error', 'No students selected', 'error');
      return;
    }

    Swal.fire({
      title: 'Promote students?',
      text: 'This cannot be undone',
      showCancelButton: true
    }).then(r => {
      if (r.isConfirmed) {
        this.promotionService.promote({
          from_class_id: this.fromClassId,
          to_class_id: this.toClassId,
          from_session_id: this.fromSessionId,
          to_session_id: this.toSessionId,
          student_ids: this.selectedStudentIds
        }).subscribe(() => {
          Swal.fire('Success', 'Students promoted', 'success');
          this.students = [];
        });
      }
    });
  }
}
