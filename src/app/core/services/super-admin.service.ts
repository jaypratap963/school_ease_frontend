import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

   constructor(private api: ApiService) {}

  createSchool(payload: { name: string; address: string }) {
    return this.api.post('/superadmin/schools', payload);
  }

  getSchools() {
    return this.api.get<any[]>('/superadmin/schools');
  }

  createSchoolAdmin(payload: {
    email: string;
    password: string;
    school_id: number;
  }) {
    return this.api.post('/superadmin/school-admins', payload);
  }
}
