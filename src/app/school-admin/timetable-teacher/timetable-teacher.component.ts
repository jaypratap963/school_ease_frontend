import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableService } from '../../core/services/timetable.service';

@Component({
  standalone: true,
  selector: 'app-timetable-teacher',
  imports: [CommonModule],
  template: `
    <h5>My Timetable</h5>
    <table class="table table-bordered">
      <tr *ngFor="let p of periods">
        <td>{{ p.day_of_week }}</td>
        <td>{{ p.start_time }} - {{ p.end_time }}</td>
        <td>Subject ID: {{ p.subject_id }}</td>
      </tr>
    </table>
  `
})
export class TimetableTeacherComponent implements OnInit {
  periods: any[] = [];
  academicSessionId = 1;

  constructor(private timetableService: TimetableService) {}

  ngOnInit() {
    this.timetableService
      .getTeacherTimetable(this.academicSessionId)
      .subscribe(res => (this.periods = res));
  }
}
