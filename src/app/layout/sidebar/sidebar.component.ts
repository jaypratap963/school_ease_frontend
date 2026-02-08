import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeSidebarOnMobile();
  }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  toggleSidebar() {
    document.body.classList.toggle('g-sidenav-pinned');
  }

  private closeSidebarOnMobile() {
    if (window.innerWidth < 1200) {
      document.body.classList.remove('g-sidenav-pinned');
    }
  }
}
