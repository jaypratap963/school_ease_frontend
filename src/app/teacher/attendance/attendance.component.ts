import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

import { ClassService } from '../../core/services/class.service';
import { StudentService } from '../../core/services/student.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SystemService } from '../../core/services/system.service';

@Component({
  standalone: true,
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  classes: any[] = [];
  students: any[] = [];

  selectedClassId: number | null = null;
  selectedDate!: string;
  systemDate!: string;

  isEditable = true;
  loading = false;

  constructor(
    private classService: ClassService,
    private studentService: StudentService,
    private attendanceService: AttendanceService,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.systemDate = this.systemService.getCurrentDate()!;
    this.selectedDate = this.systemDate;

    this.classService.getTeacherClasses().subscribe(res => {
      this.classes = res;
    });
  }

  onStatusToggle(student: any, event: Event) {
    student.status = (event.target as HTMLInputElement).checked ? 'P' : 'A';
  }

  onClassOrDateChange() {
    if (!this.selectedClassId || !this.selectedDate) return;

    this.loading = true;
    this.students = [];

    this.checkEditPermission();

    this.attendanceService
      .getAttendance(this.selectedClassId, this.selectedDate)
      .subscribe(existing => {
        this.studentService.getByClass(this.selectedClassId!).subscribe(students => {
          this.students = students.map(s => {
            const found = existing.find(a => a.student_id === s.id);
            return {
              ...s,
              status: found ? found.status : 'P'
            };
          });
          this.loading = false;
        });
      });
  }

  checkEditPermission() {
    const diffDays =
      (new Date(this.systemDate).getTime() -
        new Date(this.selectedDate).getTime()) /
      (1000 * 60 * 60 * 24);

    this.isEditable = diffDays <= 2;
  }

  saveAttendance() {
    const payload = {
      class_id: this.selectedClassId,
      date: this.selectedDate,
      records: this.students.map(s => ({
        student_id: s.id,
        status: s.status
      }))
    };

    this.attendanceService.saveAttendance(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Attendance saved',
          timer: 1200,
          showConfirmButton: false
        });
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Not allowed',
          text: err.error?.message || 'Attendance cannot be edited'
        });
      }
    });
  }
}
