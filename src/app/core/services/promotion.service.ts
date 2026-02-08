import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  constructor(private api: ApiService) {}

  promote(payload: any) {
    return this.api.post('/schooladmin/promote-students', payload);
  }
}
