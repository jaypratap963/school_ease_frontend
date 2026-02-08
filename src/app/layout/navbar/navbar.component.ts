import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();

    // Navigate to login
    this.router.navigate(['/']);

    // Optional but recommended: clear navigation history
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  toggleSidebar() {
  const sidebar = document.querySelector('app-sidebar');
  sidebar?.classList.toggle('open');
}
}
