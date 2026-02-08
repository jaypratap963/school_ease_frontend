import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SystemService {
  private currentDateSubject = new BehaviorSubject<string | null>(null);
  currentDate$ = this.currentDateSubject.asObservable();

  constructor(private api: ApiService) {}

  loadSystemDate() {
    this.api.get<{ currentDate: string }>('/system/date')
      .subscribe(res => {
        this.currentDateSubject.next(res.currentDate);
      });
  }

  getCurrentDate(): string | null {
    return this.currentDateSubject.value;
  }
}
