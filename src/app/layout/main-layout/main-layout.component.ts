import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent{

 constructor(private router: Router) {}

  goTest() {
    this.router.navigate(['/app/teacher/attendance']);
  }
}
