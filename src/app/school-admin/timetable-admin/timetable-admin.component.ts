import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TimetableService } from '../../core/services/timetable.service';

@Component({
  standalone: true,
  selector: 'app-timetable-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './timetable-admin.component.html'
})
export class TimetableAdminComponent {
  academicSessionId!: number;
  classId!: number;
  timetableId!: number;

  period = {
    day_of_week: 1,
    period_no: 1,
    start_time: '',
    end_time: '',
    subject_id: null,
    teacher_id: null
  };

  constructor(private timetableService: TimetableService) {}

  createTimetable() {
    this.timetableService
      .createOrGetTimetable({
        academic_session_id: this.academicSessionId,
        class_id: this.classId
      })
      .subscribe(res => {
        this.timetableId = res.timetable_id;
        Swal.fire('Success', 'Timetable ready', 'success');
      });
  }

  addPeriod() {
    this.timetableService
      .addPeriod({ ...this.period, timetable_id: this.timetableId })
      .subscribe({
        next: () =>
          Swal.fire('Added', 'Period added successfully', 'success'),
        error: err =>
          Swal.fire('Error', err.error.message || 'Failed', 'error')
      });
  }
}
