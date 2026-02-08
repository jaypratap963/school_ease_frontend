import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs';
import { SystemService } from './system.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'schoolease_token';
  private roleKey = 'schoolease_role';

  constructor(private api: ApiService, private systemService: SystemService) {}

  login(email: string, password: string) {
    return this.api.post<any>('/auth/login', { email, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.roleKey, response.user.role);
        this.systemService.loadSystemDate();
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
