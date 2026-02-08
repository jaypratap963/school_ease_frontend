import { Component, OnInit } from '@angular/core';
import { SchoolAdminDashboardService } from '../../core/services/school-admin.service';

@Component({
  selector: 'app-school-admin-dashboard',
  imports: [],
  templateUrl: './school-admin-dashboard.component.html',
  styleUrl: './school-admin-dashboard.component.scss'
})
export class SchoolAdminDashboardComponent implements OnInit {
  session: any;
  stats: any;

  constructor(private service: SchoolAdminDashboardService) {}

  ngOnInit(): void {
    this.service.getDashboard().subscribe((res:any) => {
      this.session = res.session;
      this.stats = res.stats;
    });
  }
}
