import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole();

      if (role === 'teacher') {
        this.router.navigate(['/app/teacher/dashboard']);
      } else if (role === 'school_admin') {
        this.router.navigate(['/app/school-admin/dashboard']);
      }
    }
  }

  submit() {
    console.log('SUBMIT CLICKED');

    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE', res);

        const role = res.user.role;

        if (role === 'teacher') {
          this.router.navigate(['/app/teacher/dashboard']);
        } else if (role === 'school_admin') {
          this.router.navigate(['/app/school-admin/dashboard']);
        } else {
          this.router.navigate(['/app']);
        }
      },
      error: (err) => {
        console.error('LOGIN ERROR', err);
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      },
    });
  }
}
