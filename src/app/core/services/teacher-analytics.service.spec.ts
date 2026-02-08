import { TestBed } from '@angular/core/testing';

import { TeacherAnalyticsService } from './teacher-analytics.service';

describe('TeacherAnalyticsService', () => {
  let service: TeacherAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
