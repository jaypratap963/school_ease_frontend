import { Component, OnInit } from '@angular/core';
import { AcademicSessionService } from '../../core/services/academic-session.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic-sessions',
  imports: [FormsModule, CommonModule],
  templateUrl: './academic-sessions.component.html',
  styleUrl: './academic-sessions.component.scss'
})
export class AcademicSessionsComponent implements OnInit {
  sessions: any;
  name = '';
  start_date = '';
  end_date = '';

  constructor(private service: AcademicSessionService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.sessions = res);
  }

  create() {
    if (!this.name || !this.start_date || !this.end_date) {
      Swal.fire('Error', 'All fields required', 'error');
      return;
    }

    Swal.fire({
      title: 'Create session?',
      showCancelButton: true
    }).then(r => {
      if (r.isConfirmed) {
        this.service.create({
          name: this.name,
          start_date: this.start_date,
          end_date: this.end_date
        }).subscribe(() => {
          Swal.fire('Created', '', 'success');
          this.name = this.start_date = this.end_date = '';
          this.load();
        });
      }
    });
  }

  activate(sessionId: number) {
    Swal.fire({
      title: 'Activate this session?',
      text: 'Previous session will be closed',
      showCancelButton: true
    }).then(r => {
      if (r.isConfirmed) {
        this.service.activate(sessionId).subscribe(() => {
          Swal.fire('Activated', '', 'success');
          this.load();
        });
      }
    });
  }
}
