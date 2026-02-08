import { TestBed } from '@angular/core/testing';

import { AcademicSessionService } from './academic-session.service';

describe('AcademicSessionService', () => {
  let service: AcademicSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
