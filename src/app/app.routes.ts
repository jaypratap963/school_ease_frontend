import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { SchoolAdminDashboardComponent } from './school-admin/school-admin-dashboard/school-admin-dashboard.component';
import { AttendanceComponent } from './teacher/attendance/attendance.component';
import { MarksComponent } from './teacher/marks/marks.component';
import { authGuard } from './core/guards/auth.guard';
import { CreateSchoolComponent } from './super-admin/create-school/create-school.component';
import { CreateSchoolAdminComponent } from './super-admin/create-school-admin/create-school-admin.component';
import { TeachersComponent } from './teacher/teachers/teachers.component';
import { ClassesComponent } from './school-admin/classes/classes.component';
import { SubjectsComponent } from './school-admin/subjects/subjects.component';
import { StudentsComponent } from './school-admin/students/students.component';
import { AssignmentsComponent } from './school-admin/assignments/assignments.component';
import { AcademicSessionsComponent } from './school-admin/academic-sessions/academic-sessions.component';
import { StudentPromotionComponent } from './school-admin/student-promotion/student-promotion.component';
import { TeacherAnalyticsComponent } from './teacher/teacher-analytics/teacher-analytics.component';
import { AdminAnalyticsComponent } from './school-admin/admin-analytics/admin-analytics.component';
import { ApplicantsComponent } from './school-admin/admissions/applicants/applicants.component';
import { ApplicantCreateComponent } from './school-admin/admissions/applicant-create/applicant-create.component';
import { EntranceExamComponent } from './school-admin/admissions/entrance-exam/entrance-exam.component';
import { FeeStructuresComponent } from './school-admin/admissions/fee-structures/fee-structures.component';
import { AdmissionOffersComponent } from './school-admin/admissions/admission-offers/admission-offers.component';
import { EnrollmentComponent } from './school-admin/admissions/enrollment/enrollment.component';
import { FeePaymentsComponent } from './school-admin/admissions/fee-payments/fee-payments.component';

// (Dashboards will be added later)
export const routes: Routes = [
  // 1️⃣ Default route → Login
  {
    path: '',
    component: LoginComponent,
  },

  // 2️⃣ App routes → With layout
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'teacher/dashboard',
        component: TeacherDashboardComponent,
      },
      {
        path: 'school-admin/dashboard',
        component: SchoolAdminDashboardComponent,
      },
      {
        path: 'teacher/analytics',
        component: TeacherAnalyticsComponent,
      },
      {
        path: 'teacher/attendance',
        component: AttendanceComponent,
      },
      {
        path: 'teacher/marks',
        component: MarksComponent,
      },
      {
        path: 'school-admin/analytics',
        component: AdminAnalyticsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'super-admin/create-school',
        component: CreateSchoolComponent,
        canActivate: [authGuard],
        data: { roles: ['super_admin'] },
      },
      {
        path: 'super-admin/create-school-admin',
        component: CreateSchoolAdminComponent,
        canActivate: [authGuard],
        data: { roles: ['super_admin'] },
      },
      {
        path: 'school-admin/teachers',
        component: TeachersComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/classes',
        component: ClassesComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/subjects',
        component: SubjectsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/students',
        component: StudentsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/assignments',
        component: AssignmentsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/academic-sessions',
        component: AcademicSessionsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/student-promotion',
        component: StudentPromotionComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/applicants',
        component: ApplicantsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/applicants/new',
        component: ApplicantCreateComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/applicants',
        component: ApplicantsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/applicant-create',
        component: ApplicantCreateComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/entrance-exam/:applicantId',
        component: EntranceExamComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/admission-offers',
        component: AdmissionOffersComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/enrollment',
        component: EnrollmentComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
      {
        path: 'school-admin/admissions/fee',
        component: FeePaymentsComponent,
        canActivate: [authGuard],
        data: { roles: ['school_admin'] },
      },
    ],
  },

  // 3️⃣ Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
