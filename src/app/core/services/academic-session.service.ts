import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AcademicSessionService {
  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get('/academic-sessions');
  }

  create(payload: any) {
    return this.api.post('/academic-sessions', payload);
  }

  activate(sessionId: number) {
    return this.api.patch(`/academic-sessions/${sessionId}/activate`, {});
  }
}

